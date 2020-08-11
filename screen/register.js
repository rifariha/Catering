import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView} from 'react-native'
import logo from '../assets/logo.png'
import bgImage from '../assets/frontbg.jpg'

const register = (props) => {
    return (
        <ScrollView>
        <View style={styles.bigContainer}>
        <Image style= { styles.backgroundImage } source={bgImage}></Image>
            <View style={styles.container} > 
                <View style={{flexDirection:'row'}}>
                    <Image source={logo} style={styles.logo}></Image>
                    <View style={{flexDirection:'column', justifyContent:'center'}}>
                        <Text style={styles.textLogin}>Welcome,</Text>
                        <Text style={styles.textLogin}>Mari Makan</Text>
                    </View>
                </View>     
                <View style={styles.card}>
                    <Text style={styles.textHeader}>Registrasi</Text>
                    <TextInput style={styles.textInput} placeholder={'Nama'}></TextInput>
                    <TextInput style={styles.textInput} placeholder={'Email'}></TextInput>
                    <TextInput style={styles.textInput} placeholder={'Password'} secureTextEntry={true}></TextInput>
                    <TextInput style={styles.textInput} placeholder={'Ulangi Password'} secureTextEntry={true}></TextInput>
                    <TextInput style={styles.textInput} placeholder={'Alamat'}></TextInput>
                    <TouchableOpacity style={styles.buttonWrapper}>
                    <Text style={styles.submitBtn}>Submit</Text>
                    </TouchableOpacity>
                </View>
                    <Text style={styles.registerTxt}> Sudah punya akun ? 
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.register}> Login disini </Text> 
                    </TouchableOpacity>
                    </Text>
            </View>
        </View>
        </ScrollView>
    )
}

export default register

const styles = StyleSheet.create({
    bigContainer: {
        resizeMode: 'cover', // or 'stretch'
    },
    container: {
        marginVertical:70,
    },
    card : {
        backgroundColor:'white',
        padding:10,
        margin:20,
        borderRadius:10,
        elevation:2
    },
     backgroundImage:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.2,
        height:'110%',
        width:'100%',
        'alignItems' :'center'
    },
    textLogin : {
        fontSize:30,
        textAlign:'center',
        fontFamily: 'Raleway-Bold',
        fontWeight:'bold'
        
    },
    textHeader:{
        color:'black',
        fontSize:20,
        padding:10,
        fontWeight:'bold',
        textAlign:'center'
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
        marginVertical:5,
        textAlign:'center'
    },
    register : {
        color:'orange',
        fontWeight:'bold',
        marginVertical:-4,
    },
    logo : { 
        width: 200, 
        height: 200, 
        justifyContent:'center'
    },
})
