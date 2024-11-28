import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Props = {};

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemTxt}>About</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemTxt}>Send Feedback</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemTxt}>Privacy Policy</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemTxt}>Terms of Use</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
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
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemTxt, { color: 'red' }]}>Logout</Text>
          <MaterialIcons name="logout" size={16} color="red" />
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
