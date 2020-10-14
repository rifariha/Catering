import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import api from './api/index'
import Cartitem from './components/cartitem';
import NumberFormat from 'react-number-format'

const orderdetail = ({navigation}) => {
    const id = navigation.state.params.id
    const [data, setData] = useState({})
    const [orderitem, setOrderitem] = useState([])

    useEffect(() => {
        
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);
            const result = await api.get('/get-order-detail.php?user_id='+userdata.id+'&order_id='+id);
            setData(result.data.result);
            setOrderitem(result.data.result.orderItems)
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
        <ScrollView>
            <View>
                <View style={{padding:10}}>
                     <Text style={{fontSize:20, fontWeight:'800'}}>Tgl.Transaksi : {data.created_at}</Text>
                    <Text style={{fontSize:20, fontWeight:'800'}}>No.Invoice : {data.invoice}</Text>
                    <Text style={{fontSize:20, fontWeight:'800'}}>Status Pembayaran : <Text style={{fontWeight:"bold"}}>{data.status}</Text></Text>
                </View>
                <Text style={{fontSize:25, fontWeight:'bold',padding:10}}>
                    Pesanan:
                </Text>
                {orderitem.map(item =>(
                    <Cartitem key={item.id} id={item.id} name={item.nama_produk} quantity={item.qty} price={item.harga} totalprice={item.total_harga} gambar={item.gambar}/>
                ))}
                <View style={{padding:10}}>
                    <Text style={{fontSize:20, fontWeight:'800'}}>Total Belanja : 
                    <NumberFormat 
                            value={data.subtotal} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp.'} 
                            renderText={formattedValue =>
                                <Text style={{fontSize:20,fontWeight:'800',marginHorizontal:10}}> {formattedValue}</Text>
                        }/>
                    </Text>
                    <Text style={{fontSize:20, fontWeight:'800'}}>Kode Promo : {data.kode_promo == null ? "-" : data.kode_promo}</Text> 
                    <Text style={{fontSize:20, fontWeight:'800'}}>Diskon : 
                    <NumberFormat 
                            value={data.diskon == null ? 0 : data.diskon} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp.'} 
                            renderText={formattedValue =>
                                <Text style={{fontSize:20,fontWeight:'800',marginHorizontal:10}}> {formattedValue}</Text>
                        }/>
                    </Text>
                    <Text style={{fontSize:20, fontWeight:'800'}}>Total Bayar : 
                    <NumberFormat 
                            value={data.subtotal} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp.'} 
                            renderText={formattedValue =>
                                <Text style={{fontSize:20,fontWeight:'bold',marginHorizontal:10}}> {formattedValue}</Text>
                        }/>
                    </Text>
                    {data.status == 'Pending' ? 
                        <View>
                            <Text style={{fontSize:20}}>Upload Bukti Tranfer : </Text>
                             <TouchableOpacity
                            style={{backgroundColor: 'orange', margin: 10, padding: 10}}
                            onPress={this.myfun}>
                            <Text style={{color: '#fff'}}>Pilih Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => uploadPic()}>
                                <Text>Upload</Text>
                            </TouchableOpacity> 
                        </View>
                        : <Text></Text>}
                </View>
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
