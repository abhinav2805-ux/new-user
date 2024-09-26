import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for icons

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle sign-in logic here
    console.log('Signing in with', email, password);
  };

  const handleSignUp = () => {
    router.push('/signup'); // Redirect to Sign Up screen
  };

  return (
    <View style={styles.container}>
      {/* Background and logo */}
      <Image source={require('../assets/background.jpg')} style={styles.background} />
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      </View>

      {/* Sign in form */}
      <View style={styles.formContainer}>
        <View style={styles.headingContainer}>
          <View style={styles.textBackground}> 
            <Text style={styles.welcomeText}>Sign in to your account</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot password */}
        <View style={styles.textBackground}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign in with Google, Facebook */}
        <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={20} color="#EA4335" style={styles.socialIcon} />
            <Text style={styles.socialText}>Sign in Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="facebook" size={20} color="#3b5998" style={styles.socialIcon} />
            <Text style={styles.socialText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>
        
        {/* Sign Up button */}
        <View style={styles.textBackground}> 
          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>No account yet?</Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signupText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 150, // Increased logo size
    height: 150,
    borderRadius: 75,
  },
  formContainer: {
    backgroundColor: 'transparent', // Make the background transparent
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  headingContainer: {
    marginBottom: 20,
  },
  textBackground: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    backgroundColor: 'white', // Keep input background white for readability
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 15,
  },
  signInText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    // marginTop: 10,
    color: '#007bff',
  },
  socialContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 10,
    borderRadius: 15,
    flex: 1, // Ensure buttons take equal space
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5, // Add spacing between the buttons
    marginBottom: 10,
  },
  socialIcon: {
    marginRight: 8,
  },
  socialText: {
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    marginRight: 5,
  },
  signupText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
