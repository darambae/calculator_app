import { Tabs } from 'expo-router';

export default function AppTabs() {
  return (
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Calculator',
            headerStyle: { backgroundColor: '#606c38' },
            headerTintColor: '#fefae0',
          }}
        />
      </Tabs>
  );
}
