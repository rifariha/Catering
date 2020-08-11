import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native'
import logo from '../assets/logo.png'
import bgImage from '../assets/frontbg.jpg'


const login = () => {
    return (
        <View style={styles.backgroundImage}> 
            <View style={{flexDirection:'row'}}>
                <Image source={logo} style={styles.logo}></Image>
                <View style={{flexDirection:'column', justifyContent:'center'}}>
                    <Text style={styles.textLogin}>Welcome,</Text>
                    <Text style={styles.textLogin}>Mari Makan</Text>
                </View>
            </View>     
            <TextInput style={styles.textInput} placeholder={'Email'}></TextInput>
            <TextInput style={styles.textInput} placeholder={'Password'} secureTextEntry={true}></TextInput>
            <TouchableOpacity style={styles.buttonWrapper}>
               <Text style={styles.submitBtn}>Login</Text>
             </TouchableOpacity>
             <Text style={styles.registerTxt}> Tidak punya akun ? <Text style={styles.register}> Daftar disini </Text> </Text>
        </View>
    )
}

export default login

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    container: {
        marginVertical:70
    },
    textLogin : {
        fontSize:30,
        textAlign:'center',
        fontFamily: 'Raleway-Bold',
        fontWeight:'bold'
    },
    textInput : {
        fontSize: 13,
        color:'#000',
        paddingHorizontal:10,
        paddingVertical:0,
        fontFamily:'Raleway-Bold',
        borderColor: 'grey',
        borderWidth: 1,
        margin:15,
        height:50,
        borderRadius:5,
    },
    buttonWrapper : {
        backgroundColor:'orange',
        borderRadius:5,
        alignItems: 'center',
        justifyContent: 'center',
        margin:15,
    },
    submitBtn : {
        color: '#ffffff',
        fontFamily:'Raleway-Bold',
        fontSize: 17,
        textAlign:'center',
        marginVertical:15
    },
    registerTxt : {
        textAlign:'center'
    },
    register : {
        color:'orange'
    },
    logo : { 
        width: 200, 
        height: 200, 
        justifyContent:'center'
    },
})
