import React, {useContext,useState,useEffect} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import api from './api/index'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Feather'


const checkout = () => {

    const [rekening, setRekening] = useState([]);
    
     useEffect(() => {
        
        const fetchData = async () => {
            const result = await api.get('/get-rekening.php');
            setRekening(result.data.result);
        };

        fetchData();
    }, []);

    const selectPayment = async({id}) => {
        try {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);
            console.log(id,userdata)
            const formData = new FormData();
            formData.append("user_id", userdata.id);
            formData.append("paymethod", id);
            const response = await api.post('/order.php', formData);
            console.log(response.data.status);
            if (response.data.status == true) {
                console.log('berhasil pesan');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
        <ScrollView>
             {rekening.map(item => (
                <TouchableOpacity key={item.id} onPress={() => selectPayment({id:item.id})}>
                    <View style={{backgroundColor:'white',borderRadius:20,margin:10,padding:5,elevation:2, flex:6, flexDirection:"row"}}>
                        <View style={{flex:5}}>
                            <Text style={{fontSize:30,fontWeight:'bold',padding:5,margin:10}}>{item.nama_bank}</Text>
                        </View>
                        <View style={{flex:1, justifyContent:"center"}}>
                            <Icon name="chevron-right" size={30}></Icon>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    )
}

checkout.navigationOptions = () =>{
    return {
        title:'Pilih Pembayaran',
    };
};

export default checkout

const styles = StyleSheet.create({
    textStylesmall : {
        fontSize: 18,
        fontWeight: '500',
        marginHorizontal: 10,
        paddingHorizontal:5

    }
})
