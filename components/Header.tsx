import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { auth, db } from '../firebaseConfig'; // Import Firebase configuration
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions

type Props = {};

// URL for random avatar
// https://xsgames.co/randomusers/avatar.php?g=female

const Header = (props: Props) => {
  const [username, setUsername] = useState('Loading...'); // Initial state

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Get the current user's UID
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        // Fetch the username from Firestore
        const userDoc = await getDoc(doc(db, 'users', uid)); // Assumes "users" collection
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username || 'Guest'); // Default to 'Guest' if no username found
        } else {
          setUsername('Guest');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
        setUsername('Guest');
      }
    };

    fetchUsername();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
          }}
          style={styles.userImg}
        />
        <View style={{ gap: 3 }}>
          <Text style={styles.welcomeTxt}>Welcome</Text>
          <Text style={styles.userTxt}>{username}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  welcomeTxt: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
  },
});
