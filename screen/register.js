import React , {useState, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity,Platform, ScrollView, Button} from 'react-native'
import logo from '../assets/logo.png'
import bgImage from '../assets/frontbg.jpg'
import { Context as AuthContext} from './context/AuthContext'
import DateTimePicker from '@react-native-community/datetimepicker';

const register = ({navigation}) => {
const {state, signup} = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [birthDate, setBirthDate] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        
        var isodate = getParsedDate(currentDate.toISOString())
        handleDate(isodate)
    };

    const handleDate = (date) => {
        setBirthDate(date)
    }

    const getParsedDate = (strDate) => {
        var strSplitDate = String(strDate).split(' ');
        var date = new Date(strSplitDate[0]);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date =  yyyy + "-" + mm + "-" + dd;
        return date.toString();
    }

    const showDatepicker = () => {
         setShow(true);
    };

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
                    <Text style={styles.textHeader}>Registrasi</Text>

                    <TextInput style={styles.textInput} placeholder='Nama'
                    value={name} onChangeText={setName} autoCapitalize='none' autoCorrect={false}
                        ></TextInput>
                    <TextInput style={styles.textInput} placeholder='Email'
                    value={email} onChangeText={setEmail} keyboardType='email-address' autoCapitalize='none' autoCorrect={false}
                    ></TextInput>
                    <TextInput style={styles.textInput} placeholder='Password' secureTextEntry={true}
                    value={password} onChangeText={setPassword} autoCapitalize='none' autoCorrect={false} secureTextEntry={true}
                    ></TextInput>
                    <TextInput style={styles.textInput} placeholder='Ulangi Password' secureTextEntry={true}
                    value={passwordConfirmation} onChangeText={setPasswordConfirmation} autoCapitalize='none' autoCorrect={false} secureTextEntry={true}
                    ></TextInput>
                    <TouchableOpacity onPress={showDatepicker}>
                        <View style={styles.textInputDate}>
                            {birthDate == '' ? 
                            <Text style={{position:'absolute',left:2,paddingTop:15,paddingLeft:5,color:'#9e9e9e'}}>Tanggal lahir</Text>
                            : <Text style={{position:'absolute',left:2,paddingTop:15,paddingLeft:5,color:'black'}}>{birthDate}</Text>
                            }
                        </View>
                        {show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            />
                        )}
                    </TouchableOpacity>
                    <TextInput style={styles.textInput} placeholder='No Hp'
                    value={phone} onChangeText={setPhone} keyboardType='numeric' maxLength={12} autoCapitalize='none' autoCorrect={false}
                    ></TextInput>
                    <TextInput style={styles.textAreaInput} placeholder='Alamat'
                    value={address} onChangeText={setAddress} autoCapitalize='none' autoCorrect={false}
                    ></TextInput>
                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => signup({name, email, password,passwordConfirmation, address, phone, birthDate})}>
                        <Text style={styles.submitBtn}>Submit</Text>
                    </TouchableOpacity>
                    {state.errorMessage ? (<Text style={styles.error}>{state.errorMessage}</Text>) : null}
                </View>
                    <Text style={styles.registerTxt}> Sudah punya akun ? 
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.register}> Login disini </Text> 
                    </TouchableOpacity>
                    </Text>
            </View>

           
        </View>
        </ScrollView>
    )
}

register.navigationOptions = () =>{
    return {
        header: () => false
    };
};

export default register

const styles = StyleSheet.create({
    bigContainer: {
        resizeMode: 'cover',
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
    textInputDate : {
        fontSize: 13,
        color:'#000',
        paddingHorizontal:10,
        paddingVertical:0,
        fontFamily:'Raleway-Bold',
        borderColor: 'grey',
        borderWidth: 1,
        margin:15,
        height:50,
        alignItems:'center',
        borderRadius:5,
    },
    textAreaInput : {
        fontSize: 13,
        color:'#000',
        paddingHorizontal:10,
        paddingVertical:0,
        fontFamily:'Raleway-Bold',
        borderColor: 'grey',
        borderWidth: 1,
        margin:15,
        height:80,
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
        textAlign:'center',
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
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
})
