import { Text, View } from 'react-native';
import 'nativewind'; // Import this to enable the use of className prop

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-3xl text-gray-800">Hello, world!</Text>
    </View>
  );
}
