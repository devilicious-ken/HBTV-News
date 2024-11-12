import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

//Url for random avatar
//https://xsgames.co/randomusers/avatar.php?g=female

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
        <View style={styles.userInfo}>
            <Image source={{uri: 'https://private-avatars.githubusercontent.com/u/181537319?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MzE0MjU4ODAsIm5iZiI6MTczMTQyNDY4MCwicGF0aCI6Ii91LzE4MTUzNzMxOSJ9.MAWEjpfhMBOZSOw1Li7VWtWl02kMINvI3Cx8HAZuQQk&s=400&u=bcfe704c49e2fa43e9a2756afaecd6f8e4aa57ee&v=4'}} style={styles.userImg}/>
            <View style={{gap: 3}}>
                <Text style={styles.welcomeTxt}>Welcome</Text>
                <Text style={styles.userTxt}>devilicious_ken</Text>
            </View>
        </View>
            <TouchableOpacity onPress={() => {}}>
                <Ionicons name='notifications-outline' size={24} color={Colors.black} />
            </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    userImg: {
        width:50,
        height: 50,
        borderRadius: 30
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    welcomeTxt: {
        fontSize: 12,
        color: Colors.darkGrey
    },
    userTxt: {
        fontSize: 14,
        fontWeight: '700',
        color:Colors.black
    }
})