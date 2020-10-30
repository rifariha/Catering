import React , {useState, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button, ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import logo from '../assets/logo.png'
import bgImage from '../assets/frontbg.jpg'
import { Context as AuthContext} from './context/AuthContext'


const login = ({navigation}) => {
    const {state, signin, tryLocalSignin} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView>
                <View style={styles.bigContainer}>
                <Image style= { styles.backgroundImage } source={bgImage}></Image>
                    <View style={styles.container} > 
                        <View style={{flexDirection:'row'}}>
                            <Image source={logo} style={styles.logo}></Image>
                            <View style={{flexDirection:'column', justifyContent:'center'}}>
                                <Text style={styles.textLogin}>Welcome,</Text>
                                <Text style={styles.textLogin}>Sinar Minang</Text>
                                <Text style={styles.textLogin}>Catering</Text>
                            </View>
                        </View>     
                        <View style={styles.card}>
                            {/* <NavigationEvents 
                                onWillFocus={{clearErrorMessage}}
                            /> */}
                            <Text style={styles.textHeader}>Silahkan Login</Text>
                            <TextInput style={styles.textInput} placeholder='Email' 
                            value={email} onChangeText={setEmail} autoCorrect={false} autoCapitalize='none'
                            // value={email} onChangeText={(username) => setEmail(username)}
                            // value={this.state.username} onChangeText={(username) => this.setState({username})}
                            ></TextInput>
                            <TextInput style={styles.textInput} placeholder='Password' 
                            value={password} onChangeText={setPassword}  autoCorrect={false}
                            // value={password} onChangeText={(password) => setPassword(password)}
                            // value={this.state.password} onChangeText={(password) => this.setState({password})} 
                            secureTextEntry={true}></TextInput>
                            {/* {password.length < 4 ? <Text>Password harus setidaknya 4 karakter</Text> : null} */}
                            {/* <Button title="Login" onPress={() => alert('Mau daftar ya')} style={styles.buttonWrapper}></Button> */}
                            <TouchableOpacity style={styles.buttonWrapper} onPress={() => signin({email, password})}>
                            <Text style={styles.submitBtn}>Login</Text>
                            </TouchableOpacity>
                            {state.errorMessage ? (<Text style={styles.error}>{state.errorMessage}</Text>) : null}
                            {state.registerSuccess ? (<Text style={styles.success}>{state.registerSuccess}</Text>) : null}
                        </View>
                            <Text style={styles.registerTxt}> Tidak punya akun ? 
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={styles.register}> Daftar disini </Text> 
                            </TouchableOpacity>
                            </Text>
                    </View>
                </View>
        </ScrollView>
    )
}

login.navigationOptions = () =>{
    return {
        header: () => false
    };
};

export default login

const styles = StyleSheet.create({
    bigContainer: {
        resizeMode: 'contain', // or 'stretch'
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
        alignItems :'center'
    },
    textLogin : {
        fontSize:30,
        textAlign:'left',
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
    error : {
        padding:10,
        margin:10, 
        color:'red',
        textAlign:"center"
    },
    success : {
        padding:10,
        margin:10, 
        color:'green',
        fontWeight:'bold',
        textAlign:"center",
    },
})
