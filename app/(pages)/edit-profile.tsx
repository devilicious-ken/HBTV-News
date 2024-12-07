import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { auth, db } from '../../firebaseConfig'; // Import Firebase configuration
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore functions
import { router } from 'expo-router';
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword, sendEmailVerification } from 'firebase/auth'; // Authentication functions

type Props = {};

const EditProfile = (props: Props) => {
    const [username, setUsername] = useState('Loading...');
    const [email, setEmail] = useState('Loading...');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            // Get the current user's UID from Firebase Auth
            const uid = auth.currentUser?.uid;
            if (!uid) return;
    
            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', uid)); // Assumes "users" collection
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUsername(userData.username || 'Guest'); // Default to 'Guest' if no username found
              setEmail(userData.email || 'No Email'); // Default to 'No Email' if no email found
            } else {
              setUsername('Guest');
              setEmail('No Email');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            setUsername('Guest');
            setEmail('No Email');
          }
        };
    
        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const uid = auth.currentUser?.uid;
            const user = auth.currentUser;
            if (!uid || !user) return;

            // Reauthenticate the user to confirm password for email/password updates
            const credential = EmailAuthProvider.credential(user.email!, password);
            await reauthenticateWithCredential(user, credential);

            // Update the username and email in Firestore
            const userRef = doc(db, 'users', uid);
            await updateDoc(userRef, {
                username: username,
            });


            // If a new password is provided, update it
            if (newPassword) {
                await updatePassword(user, newPassword);
            }

            // Navigate back to the profile page after saving
            router.replace('/(tabs)/profile');
        } catch (error) {
            console.error('Error updating user data:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>

            {/* Profile Picture */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=pixel' }} // Replace with the actual profile image URL
                    style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editImageBtn}>
                    <Ionicons name="pencil" size={16} color={Colors.white} />
                </TouchableOpacity>
            </View>

            {/* Full Name Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Current Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    editable={false} // Disable editing of current email
                />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Current Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
            </View>

            {/* New Password Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password (Leave blank to keep current)</Text>
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry
                />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => router.replace('/(tabs)/profile')}
                    style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageBtn: {
    position: 'absolute',
    bottom: -15,
    backgroundColor: Colors.black,
    padding: 8,
    borderRadius: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.darkGrey,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: Colors.lightGrey,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: Colors.black,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.white,
  },
});
