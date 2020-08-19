import React, {useContext,useState,useEffect} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'
import {Context as AuthContext} from './context/AuthContext'
const account = () => {

    const {signout} = useContext(AuthContext)

    const [data, setData] = useState('')

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);

            if (userdata !== null) {
                setData(userdata)
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    useEffect(() => {
        readData()
    }, [])

    return (
        <View>
        <ScrollView>
            <View style={{backgroundColor:'white',borderRadius:20,margin:10,padding:5,elevation:2}}>
                <Text style={{fontSize:30,fontWeight:'bold',padding:5,margin:10}}>{data.nama}</Text>
                <Text style={styles.textStyle}>{data.email}</Text>
                <Text style={styles.textStyle}>{data.alamat}</Text>
                <Text style={styles.textStyle}>{data.nomorTelepon}</Text>
                <View style={{borderRadius:20,padding:20}}>
                    <Button color="orange" title="logout" onPress={signout} />
                </View>
            </View>
        </ScrollView>
        </View>
    )
}

account.navigationOptions = () =>{
    return {
        title:'Akun Saya',
    };
};

export default account

const styles = StyleSheet.create({
    textStyle : {
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 10,
        paddingHorizontal:5

    }
})
