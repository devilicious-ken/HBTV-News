import { Stack } from "expo-router";
import React from 'react';


const Layout = ()  => {

  return (

      <Stack>
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
      </Stack>

  );
}
 

export default Layout;