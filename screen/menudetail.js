import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import api from './api/index'
import PriceFormat from './components/priceformat';
import FloatingButton from './components/chatbutton';


const detail = ({navigation}) => {
    const id = navigation.state.params.id
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
        const result = await api.get('/get-menu-detail.php?id='+id);
            console.log(result.data.result)
            setData(result.data.result);
        };

        fetchData();
    }, []);

    const additem = async () => {
        try 
        {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);

            const formData = new FormData();
            formData.append("menu_id", id);
            formData.append("user_id", userdata.id);
            
            const response = await api.post('/add-cart.php', formData);
            if(response.data.status === true)
            {
                alert(response.data.message)
            }
            else
            {
                alert('Menu gagal dimasukkan ke keranjang')
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    return (
        <View style={styles.container}>
        <ScrollView>
            <View>
                    <View>
                        <Image style={{width: '100%',height:undefined, aspectRatio:1}} source={{ uri: data.gambar }}></Image>
                    </View>
                    <View>
                        <Text style={{margin:10,paddingVertical:10,fontSize:32,fontWeight:'bold'}}>{data.nama_produk}</Text>
                        <PriceFormat value={data.harga} ></PriceFormat>
                        <Text style={{margin:10,paddingVertical:10,fontSize:20,textAlign:'justify'}}>{data.deskripsi}</Text>
                    </View>
                    <View style={{borderRadius:20,padding:20}}>
                        <Button color="orange" title="Pilih Pesanan" onPress={() => additem()} />
                    </View>
            </View>
        </ScrollView>
         <FloatingButton/>
        </View>
  );
}

detail.navigationOptions = ({navigation}) => {
    return {
        title:navigation.state.params.name,
        headerTransparent: false
    };
}; 

export default detail

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        flex: 1, 
        backgroundColor:'white',
        alignItems: 'center',
    },

})
