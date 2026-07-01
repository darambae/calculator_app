import { useState } from 'react';
import { evaluate } from 'mathjs';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const buttons = [
    ['7', '8', '9', '+'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '*'],
    ['0', '.', '00', '/'],
    ['C', 'AC', '=']
];

const operators = ['+', '-', '*', '/'];

const App = () => {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const insets = useSafeAreaInsets();

    const [result, setResult] = useState(0);
    const [expressions, setExpressions] = useState('');
    const [isCalculated, setIsCalculated] = useState(false);
    const resetCalculator = () => {
        setExpressions('');
        setResult(0);
        setIsCalculated(false);
    };
    const handleButtonPress = (key: string) => {
        let currentExpr = expressions;
        const lastChar = currentExpr.slice(-1);
        
        if (isCalculated && !['AC', 'C', ...operators].includes(key)) resetCalculator();

        switch (key) {
            case 'AC':
                resetCalculator();
                break;

            case 'C':
                if (isCalculated) {
                    resetCalculator();
                } else {
                    setExpressions(currentExpr.slice(0, -1));
                }
                break;

            case '-':
                if (lastChar === '-') return;
                setExpressions((isCalculated ? result.toString() : currentExpr) + key);
                setIsCalculated(false);
                break;

            case '+':
            case '*':
            case '/':
                if (operators.includes(lastChar)) return;
                if (lastChar === '.') currentExpr += '0';
                
                if (isCalculated) {
                    setExpressions(result.toString() + key);
                    setResult(0);
                    setIsCalculated(false);
                } else {
                    setExpressions(currentExpr + key);
                }
                break;

            case '.':
                if (currentExpr === '' || isCalculated) {
                    setExpressions('0.');
                    return;
                }
                const parts = currentExpr.split(/[+\-*/]/);
                const currentNumber = parts[parts.length - 1];
                if (currentNumber.includes('.') || lastChar === '.') return;
                if (operators.includes(lastChar)) currentExpr += '0';
                
                setExpressions(currentExpr + key);
                break;

            case '=':
                if (!currentExpr || operators.includes(lastChar)) return;
                try {
                    const evalResult = parseFloat(evaluate(currentExpr).toFixed(10));
                    if (isNaN(evalResult)) throw new Error('Invalid result');
                    setResult(evalResult);
                    setExpressions(currentExpr);
                    setIsCalculated(true);
                } catch {
                    setResult(NaN);
                    setExpressions('Error');
                    setIsCalculated(false);
                }
                break;

            default:
                if ((key === '0' || key === '00') && currentExpr === '0') return;
                const nextKey = (key === '00' && currentExpr === '') ? '0' : key;
                setExpressions(currentExpr === '0' ? nextKey : currentExpr + nextKey);
                break;
        }
        if (Number.isNaN(result) || !Number.isFinite(result)) {
            resetCalculator();
        }
    };

    const displayFlex = isLandscape ? 4 : 3;
    const keypadFlex = isLandscape ? 5 : 7;
    const exprFontSize = isLandscape ? 20 : 30;
    const resultFontSize = isLandscape ? 40 : 50;

    return (
        <View style={[
            styles.container, 
            { paddingLeft: insets.left, paddingRight: insets.right, paddingTop: insets.top, paddingBottom: insets.bottom }
        ]}>
            <View style={{ flex: displayFlex, width: '100%' }}>
                <View style={styles.exprContainer}>
                    <Text 
                        numberOfLines={4} 
                        adjustsFontSizeToFit 
                        minimumFontScale={0.5} 
                        style={[styles.exprText, { fontSize: exprFontSize }]}
                    >
                        {expressions}
                    </Text>
                </View>
                <View style={styles.resultContainer}>
                    <Text 
                        numberOfLines={1} 
                        adjustsFontSizeToFit 
                        minimumFontScale={0.5} 
                        style={[styles.resultText, { fontSize: resultFontSize }]}
                    >
                        {result}
                    </Text>
                </View>
            </View>

            <View style={{ flex: keypadFlex }}>
                {buttons.map((row, rowIndex) => (
                    <View style={styles.row} key={rowIndex}>
                        {row.map((key) => (
                            <TouchableOpacity key={key} style={styles.button} onPress={() => handleButtonPress(key)}>
                                <Text style={[styles.buttonText, { fontSize: isLandscape ? 20 : 35 }]}>
                                    {key}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fefae0' },
    exprContainer: { justifyContent: 'flex-end', flex: 1 },
    exprText: { textAlign: 'right', margin: 5 },
    resultContainer: { justifyContent: 'center', flex: 1 },
    resultText: { textAlign: 'right', fontWeight: 'bold', margin: 5 },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        height: '90%',
        backgroundColor: '#bc6c25',
        borderWidth: 1,
        borderColor: '#764316',
        borderRadius: 15
    },
    buttonText: { color: '#fefae0' }
});

export default App;