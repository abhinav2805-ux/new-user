import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = () => {
    // Placeholder: Logic for signing up a new user
    // Redirect to the sign-in page after successful registration
    router.push('/signin');
  };

  return (
    <StyledView className="flex-1 justify-center items-center p-4">
      <StyledText className="text-lg font-bold mb-4">Sign Up</StyledText>
      <StyledTextInput
        className="border rounded-md w-full p-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <StyledTextInput
        className="border rounded-md w-full p-2 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <StyledButton title="Sign Up" onPress={handleSignUp} />
    </StyledView>
  );
}
