import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { router } from 'expo-router';
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../firebaseConfig"; // Import Firestore instance


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Validation Function
  const validateFields = () => {
    let tempErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) tempErrors.username = 'Username is required';
    if (!email.trim() || !emailRegex.test(email))
      tempErrors.email = 'Valid email is required';
    if (!password.trim() || password.length < 6)
      tempErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword)
      tempErrors.confirmPassword = 'Passwords do not match';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    if (validateFields()) {
      try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        // Store user data in Firestore
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          username,
          email,
          createdAt: new Date(),
        });
  
        // Show the success modal
        setIsModalVisible(true);
      } catch (error) {
        console.error("Error creating account:", error);
        Alert.alert("Error", "Failed to create account. Please try again.");
      }
    }
  };

  // Close Modal
  const closeModal = () => {
    setIsModalVisible(false);
    // Reset input fields after account creation
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    router.replace('/(auth)/sign-in')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      {/* Username Input */}
      <TextInput
        placeholder="Username"
        style={[styles.input, errors.username && styles.errorInput]}
        value={username}
        onChangeText={setUsername}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        style={[styles.input, errors.email && styles.errorInput]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        style={[styles.input, errors.password && styles.errorInput]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* Confirm Password Input */}
      <TextInput
        placeholder="Confirm Password"
        style={[
          styles.input,
          errors.confirmPassword && styles.errorInput,
        ]}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <Text style={styles.orText}>Or</Text>

      {/* Sign in with Google */}
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Sign In with Google</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account? </Text>
        <TouchableOpacity onPress={()=>router.back()}>
          <Text style={styles.linkHighlight}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Success */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congrats!</Text>
            <Text style={styles.modalMessage}>
              Your account has been successfully created.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#7c7c7c',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#9b22e8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    marginVertical: 15,
    fontSize: 14,
    color: '#7c7c7c',
  },
  googleButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#9b22e8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#9b22e8',
    fontSize: 16,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  linkText: {
    fontSize: 14,
    color: '#7c7c7c',
  },
  linkHighlight: {
    fontSize: 14,
    color: '#9b22e8',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#7c7c7c',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#9b22e8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
