import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = () => {
    // For now, redirect to the home page (tabs) when the user signs in
    router.push('/(tabs)');
  };

  const handleSignUp = () => {
    // Redirect to the sign-up page when the "Sign Up" button is pressed
    router.push('/signup');
  };

  return (
    <StyledView className="flex-1 justify-center items-center p-4">
      <StyledText className="text-lg font-bold mb-4">Sign In</StyledText>
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
      <StyledButton title="Sign In" onPress={handleSignIn} />
      
      {/* Add a sign-up button below */}
      <StyledView className="mt-4">
        <StyledText>Don't have an account?</StyledText>
        <StyledButton title="Sign Up" onPress={handleSignUp} />
      </StyledView>
    </StyledView>
  );
}
