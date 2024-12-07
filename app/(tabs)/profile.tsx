import { StyleSheet, Text, View, Switch, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, Stack } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { auth, db } from '../../firebaseConfig'; // Import Firebase configuration
import { doc, getDoc, deleteDoc } from 'firebase/firestore'; // Firestore functions
import { deleteUser } from 'firebase/auth'; // Authentication function

type Props = {};

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [username, setUsername] = useState('Loading...');
  const [email, setEmail] = useState('Loading...');

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

  const handleDeleteAccount = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      // Show a confirmation dialog before deleting the account
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              // Delete user data from Firestore
              await deleteDoc(doc(db, 'users', uid));

              // Delete user from Firebase Authentication
              const user = auth.currentUser;
              if (user) {
                await deleteUser(user);
              }

              // After deletion, navigate to the login screen or logout
              router.replace('/(auth)/sign-in');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'There was an issue deleting your account.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileHeader}>
          <TouchableOpacity 
            onPress={() => router.replace('/(pages)/edit-profile')}
            style={styles.editBtn}>
            <Ionicons name="pencil" size={20} color={'black'} />
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=pixel' }} // Replace with actual profile image URL
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{username}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Rest of the Content */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemTxt}>About</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemTxt}>Privacy Policy</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemTxt}>Terms of Use</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemTxt}>Dark Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(auth)/sign-in')} style={styles.itemBtn}>
          <Text style={[styles.itemTxt, { color: 'red' }]}>Logout</Text>
          <MaterialIcons name="logout" size={16} color="red" />
        </TouchableOpacity>

        {/* Delete Account Button */}
        <TouchableOpacity onPress={handleDeleteAccount} style={styles.itemBtn}>
          <Text style={[styles.itemTxt, { color: 'red' }]}>Delete Account</Text>
          <MaterialIcons name="delete-outline" size={16} color="red" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  editBtn: {
    left: 160,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.lightGrey,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.background,
    marginVertical: 10,
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
  },
  itemTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
});
