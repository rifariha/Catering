import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import api from './api/index'
import Cartitem from './components/cartitem';

const orderdetail = ({navigation}) => {
    const id = navigation.state.params.id
    const [data, setData] = useState({})

    useEffect(() => {
        
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);
            const result = await api.get('/get-order-detail.php?user_id='+userdata.id+'&order_id='+id);
            setData(result.data.result);
            console.log(result.data.result)
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
        <ScrollView>
            <View>
                <Text>Hai</Text>
                {/* <Cartitem id={item.id} name={item.nama_produk} quantity={item.qty} price={item.harga} totalprice={item.total_harga} gambar={item.gambar}/> */}
            </View>
        </ScrollView>
        </View>
  );
}

orderdetail.navigationOptions = ({navigation}) => {
    return {
        title:'Detail Pesanan',
        headerTransparent: false
    };
}; 

export default orderdetail

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
