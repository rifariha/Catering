import React, {useContext, useState, useEffect} from 'react'
import Cartitem from './components/cartitem'
import {StyleSheet, Text, View,  TextInput,Button} from 'react-native'
import PriceFormat from './components/priceformat';
import AsyncStorage from '@react-native-community/async-storage'
import {ScrollView, FlatList} from 'react-native-gesture-handler'
import api from './api/index'
import NumberFormat from 'react-number-format'
const keranjang = ({navigation}) => {

    const [data, setData] = useState([]);
    const [order, setOrder] = useState('');
    const [promo, setPromo] = useState('');
    // const [usedPromo, setusedPromo] = useState(false);

    useEffect(() => {
        
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const result = await api.get('/get-cart.php?user_id='+userdata.id);
            setOrder(result.data.result);
            setData(result.data.result.cart_items);
            // console.log(result.data.result);
        };
        fetchData();
    }, []);

    return (
    
    <View style={{height:'100%', backgroundColor:'#ecf0f1'}}>
        <View style={{flex:8.5}}> 
            <ScrollView>
                {order.kode_promo == null ? 
                <View style={styles.promoInput}>
                    <View style={{flex:3}}>
                    <TextInput placeholder='Masukkan Kode Promo'
                        value={promo} onChangeText={setPromo} autoCapitalize='none' autoCorrect={false}
                            ></TextInput>
                    </View>
                    <View style={{alignItems:'center', flex:1,justifyContent:'center'}}>
                        <Button title="Submit" onPress={() => {}} />
                    </View>
                </View> : <View style={styles.promoInput}>
                    <View style={{flex:3}}>
                        <Text> Anda menggunakan kode promo <Text style={{fontWeight:'bold'}}>{order.kode_promo}</Text></Text>
                    </View>
                </View>}

                {data.map(item =>(
                    <Cartitem  key={item.id} name={item.nama_produk} quantity={item.qty} price={item.harga} gambar={item.gambar}/>
                    ))
                }
            </ScrollView>
        </View>
        <View style={{flex:1.5,backgroundColor:'white',flexDirection:'row'}}>
            <View style={{alignItems:'flex-start',justifyContent:"flex-start",flex:3,flexDirection:'column',margin:10}}>
                <Text style={{fontSize:14,alignItems:'center',justifyContent:'center',fontWeight:'500',paddingHorizontal:10}}>
                    Total Pesanan  : 
                    <NumberFormat 
                        value={order.subtotal} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'Rp.'} 
                        renderText={formattedValue =>
                            <Text style={{fontSize:14,fontWeight:'500',marginHorizontal:10,fontWeight:'bold'}}>{formattedValue}</Text>
                        }/>
                </Text>
                <Text style={{fontSize:14,alignItems:'center',justifyContent:'center',fontWeight:'500',paddingHorizontal:10}}>
                    Diskon Promo: 
                    <NumberFormat 
                        value={ order.diskon == null ? 0 : order.diskon} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'Rp.'} 
                        renderText={formattedValue =>
                            <Text style={{fontSize:14,fontWeight:'500',marginHorizontal:10,fontWeight:'bold'}}>{formattedValue}</Text>
                        }/>
                </Text>
                <Text style={{fontSize:14,alignItems:'center',justifyContent:'center',fontWeight:'500',paddingHorizontal:10}}>
                        Total Bayar :
                    <NumberFormat 
                        value={order.grand_total} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'Rp.'} 
                        renderText={formattedValue =>
                            <Text style={{fontSize:14,fontWeight:'500',marginHorizontal:10,fontWeight:'bold'}}>{formattedValue}</Text>
                        }/>
                </Text>
                {/* <Text style={{fontSize:18,alignItems:'flex-end',justifyContent:'center',fontWeight:'bold',paddingHorizontal:10}}>
                    <PriceFormat value={order.grand_total}></PriceFormat>
                </Text> */}
            </View>
            <View style={{alignItems:'center', flex:1,justifyContent:'center'}}>
                <Button title="Pesan"/>
            </View>
        </View>
    </View>)
}

keranjang.navigationOptions = () =>{
    return {
        title:'Pesanan Anda',
    };
};

export default keranjang

const styles = StyleSheet.create({
    promoInput : {
        backgroundColor:'white',
        padding:10,
        margin:10,
        flexDirection:'row',
    }
})

