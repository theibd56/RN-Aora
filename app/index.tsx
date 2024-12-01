import { Text, View } from "react-native";
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
        <Text>RN Aora</Text>
        <StatusBar style="auto"/>
        <Link href="/profile" style={{color: 'blue'}}>
            Go to Profile
        </Link>
    </View>
  );
}
