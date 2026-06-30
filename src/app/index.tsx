import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const buttons = [
    ['7', '8', '9', '+'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '*'],
    ['0', '.', '00', '/'],
    ['=', 'C', 'AC', '']
];

const App = () => {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const insets = useSafeAreaInsets();
    const result = 0;
    const expressions = '123+456';
    
    return (
        <View style={[styles.container, { paddingLeft: insets.left, paddingRight: insets.right, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={{ flex: isLandscape ? 4 : 3, width: '100%' }}>
                <View style={{ justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: isLandscape ? 20 : 30, textAlign: 'right', height: '40%', margin: 5 }}>{expressions}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: isLandscape ? 40 : 50, textAlign: 'right', height: '60%', fontWeight: 'bold', margin: 5 }}>{result}</Text>
                </View>
            </View>
            <View style={{ flex: isLandscape ? 5 : 7 }}>
                {buttons.map((row, rowIndex) => (
                    <View style={styles.row} key={rowIndex}>
                        {row.map((key) => (
                            <TouchableOpacity key={key} style={styles.button} onPress={() => console.log(key)}>
                                <Text style={{ fontSize: isLandscape ? 20 : 35, color: '#fefae0' }}>{key}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fefae0' },
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
    }
});
export default App;
