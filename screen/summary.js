import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'
import order from './order'
import NumberFormat from 'react-number-format'

const summary = ({navigation}) => {

    const [data, setData] = useState({})
    const [rekening, setRekening] = useState({})
    const [orderitem, setOrderitem] = useState([])

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('ordersummary')
            console.log(value)
            const orderdata = JSON.parse(value);
            if(orderdata != null)
            {
                setData(orderdata)
                setOrderitem(orderdata.orderItems)
                setRekening(orderdata.rekening)
            } 
        } catch (e) {
            console.log(e)
            alert('Terjadi kesalahan pada sistem, Silahkan coba lagi')
        }
    }

    useEffect(() => {
        readData()
    }, [])

    return (
        <View>
            <ScrollView>
                {data != null ? 
                <View style={{backgroundColor:'white',borderRadius:10, margin:10,padding:5,elevation:2}}>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:15}}>No. Invoice : </Text>
                        <Text style={{fontSize:30,fontWeight:'bold',marginHorizontal:10}}>{data.invoice}</Text>
                    </View>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:15}}>Total Bayar : </Text>
                        <NumberFormat 
                            value={data.grand_total} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp.'} 
                            renderText={formattedValue =>
                                <Text style={{fontSize:30,fontWeight:'500',marginHorizontal:10,fontWeight:'bold'}}>{formattedValue}</Text>
                        }/>
                    </View>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:15}}> Tujuan Pembayaran : </Text>
                        <View style={{justifyContent:'flex-start',marginHorizontal:10}}>
                            <Text style={{fontSize:25,fontWeight:'bold'}}> Rekening {rekening.nama_bank} </Text>
                            <Text style={{fontSize:25,fontWeight:'bold'}}> No. Rek: {rekening.nomor_rekening} </Text>
                            <Text style={{fontSize:25,fontWeight:'bold'}}> a.n {rekening.nama} </Text>
                        </View>
                    </View>
                    <View style={{padding:10}}>    
                        <Text style={{fontSize:15}}> Pesanan : </Text>
                        {orderitem.map(item =>(
                          <View style={styles.wrapper} key={item.id}>
                            <View>
                                <Image style={styles.cover} source={{uri:item.gambar}}></Image>
                            </View>
                            <View style={{margin:5,justifyContent:'space-around'}}>
                                <Text style={{fontSize:20,fontWeight:'bold',marginHorizontal:10}}>{item.nama_produk}</Text>
                                
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:15, marginTop:3}}> x {item.qty} </Text>
                                </View>
                            </View>
                        </View>
                        ))}
                    </View>
                    <View style={{justifyContent:'center',borderRadius:20,padding:20}}>
                        <Button title="Buat Pesanan baru" color="orange" onPress={() => {navigation.navigate('DaftarMenu')}}/>
                    </View>
                </View>
                : null }
            </ScrollView>
        </View>
    )
}

summary.navigationOptions = () =>{
    return {
        title:'Pesanan Berhasil',
    };
};

export default summary

const styles = StyleSheet.create({
    textStyle : {
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 10,
        paddingHorizontal:5
    }, 
    wrapper : {
        borderColor:'black',
        elevation:1,
        flexDirection:'row',
        margin:10,
        padding:10,
        backgroundColor:'white',
        borderRadius:20,
        // justifyContent:'space-around'
    },
     cover: {
        width: 100,
        height: 100,
        borderRadius: 20,
        padding:5,
        borderBottomWidth:2
    },
    textStylesmall : {
        fontSize: 10,
        fontWeight: '200',
        marginHorizontal: 10,
        paddingHorizontal:5
    }
})
