import React , {useState,useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from './api/index'
import { navigate } from './navigationRef'

const profileupdate = ({navigation}) => {

    // const [data,setData] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [refreshing, setRefreshing] = useState(false);


    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);

            if (userdata !== null) {
                console.log(userdata)
                setName(userdata.nama)
                setEmail(userdata.email)
                setPhone(userdata.nohp)
                setAddress(userdata.alamat)
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    useEffect(() => {
        readData()
    }, [])

    

    const updateProfile = async ({name,email,address,phone}) => {
        try {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);

            const formData = new FormData();
            formData.append("nama", name);
            formData.append("email", email);
            formData.append("nohp", phone);
            formData.append("alamat", address);
            formData.append("user_id", userdata.id);
            const response = await api.post('/update-user.php', formData);
            console.log(response.data.status);
            if (response.data.status == true) 
            {   
                const newProfile = {
                    'id' : userdata.id,
                    'nama' : name,
                    'email' : email,
                    'nohp' : phone,
                    'alamat' : address
                }
                await AsyncStorage.setItem('userdata', JSON.stringify(newProfile));
                navigate('Account')
                alert('Profile berhasil di update')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView>
            <View style={styles.container} > 
                <View style={styles.card}>
                    <TextInput style={styles.textInput} placeholder='Nama'
                    value={name} onChangeText={setName} autoCapitalize='none' autoCorrect={false}
                        ></TextInput>
                    <TextInput style={styles.textInput} placeholder='Email'
                    value={email} onChangeText={setEmail} keyboardType='email-address' autoCapitalize='none' autoCorrect={false}
                    ></TextInput>
                    <TextInput style={styles.textInput} placeholder='No Hp'
                    value={phone} onChangeText={setPhone} keyboardType='numeric' maxLength={12} autoCapitalize='none' autoCorrect={false}
                    ></TextInput>
                    <TextInput style={styles.textAreaInput} placeholder='Alamat'
                    value={address} onChangeText={setAddress} autoCapitalize='none' autoCorrect={false}
                    ></TextInput>
                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => updateProfile({name, email, address, phone})}>
                        <Text style={styles.submitBtn}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

profileupdate.navigationOptions = () =>{
    return {
        title:'Update Profile',
        headerTransparent: false
    };
};

export default profileupdate

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        flex: 1, 
        paddingVertical:10,
        backgroundColor:'white',
    },
    card : {
        padding:10,
        margin:20,
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
})
