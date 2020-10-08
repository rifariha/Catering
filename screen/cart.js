import React, {useState, useEffect, useCallback} from 'react'
import PriceFormat from './components/priceformat';
import {StyleSheet, Text, View,  TextInput,Button,Image, Alert,RefreshControl, SafeAreaView} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import api from './api/index'
import NumberFormat from 'react-number-format'

const keranjang = ({navigation}) => {

    const [data, setData] = useState([]);
    const [order, setOrder] = useState('');
    const [promo, setPromo] = useState('');
    const [refreshing, setRefreshing] = useState(false);


    confirm = ({id, name, quantity}) => {
        Alert.alert(
          'Apakah anda yakin menghapus item ini ?',
          name + ' ' + quantity +' porsi',
          [
            {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
            {text: 'YES', onPress: () => deleteItem({id})},
          ]
        );
      }

    useEffect(() => {
        
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const result = await api.get('/get-cart.php?user_id='+userdata.id);
            
            if(result.data.status == true)
            {
                setOrder(result.data.result);
                setData(result.data.result.cart_items);
                console.log(data);
            } 
            else 
            {
                console.log(order)
            }
        };

        fetchData();
    }, []);


    const ambilData = async () => {
        const value = await AsyncStorage.getItem('userdata');
        const userdata = JSON.parse(value);
        const result = await api.get('/get-cart.php?user_id='+userdata.id);
        
        if(result.data.status == true)
        {
            setOrder(result.data.result);
            setData(result.data.result.cart_items);
            console.log(data);
        } 
        else 
        {
            console.log(order)
        }
    };

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = useCallback(() => {
            setRefreshing(true);
            ambilData();
            wait(2000).then(() => setRefreshing(false));
        }, []);

    const deleteItem = async({id}) => {
        try {
            const formData = new FormData();
            formData.append("cart_items", id);
            const response = await api.post('/delete-cart.php', formData);
            console.log(id);
            console.log(response.data.status);
            if (response.data.status == true) {
                const value = await AsyncStorage.getItem('userdata');
                const userdata = JSON.parse(value);
                const result = await api.get('/get-cart.php?user_id='+userdata.id);
                setOrder(result.data.result);
                setData(result.data.result.cart_items);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const postPromo = async ({promo}) => {
        try {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);

            const formData = new FormData();
            formData.append("kode_promo", promo);
            formData.append("user_id", userdata.id);
            const response = await api.post('/add-promo.php', formData);
            console.log(response.data.status);
            if (response.data.status == true) {
                const value = await AsyncStorage.getItem('userdata');
                const userdata = JSON.parse(value);
                const result = await api.get('/get-cart.php?user_id='+userdata.id);
                setOrder(result.data.result);
                setData(result.data.result.cart_items);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const addQuantity = async ({id,quantity}) => {
        try {
            // console.log(id,quantity);
            const formData = new FormData();
            formData.append("cart_items", id);
            formData.append("qty", parseInt(quantity)+1);
            const response = await api.post('/update-cart.php', formData);
            console.log(response.data.status);
            if (response.data.status == true) {
                const value = await AsyncStorage.getItem('userdata');
                const userdata = JSON.parse(value);
                const result = await api.get('/get-cart.php?user_id='+userdata.id);
                setOrder(result.data.result);
                setData(result.data.result.cart_items);
            }
            

        } catch (error) {
            console.log(error);
        }
    }

    const removeQuantity = async ({id,quantity}) => {
        try {
            // console.log(id,quantity);
            const formData = new FormData();
            formData.append("cart_items", id);
            formData.append("qty", parseInt(quantity)-1);
            const response = await api.post('/update-cart.php', formData);
            console.log(response.data.status);
            if (response.data.status == true) {
                const value = await AsyncStorage.getItem('userdata');
                const userdata = JSON.parse(value);
                const result = await api.get('/get-cart.php?user_id='+userdata.id);
                // console.log(result.data.result)
                setOrder(result.data.result);
                setData(result.data.result.cart_items);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
    
    <SafeAreaView style={{height:'100%', backgroundColor:'#ecf0f1'}}>
         <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {order == null ? 
            <View style={styles.container}>
                <Icon name="shopping-cart" size={100}></Icon>
                <Text style={styles.text}>Keranjang anda kosong</Text>
                <Text>Silahkan Belanja terlebih dahulu</Text>
                <View style={{alignItems:'center', flex:1,justifyContent:'center',paddingVertical:20}}>
                    <Button title="Mulai Belanja" onPress={() => {navigation.navigate('Menu')}}/>
                </View>         
            </View>
        :
        <View style={{flex:8.5}}> 
           
                {order.kode_promo == null ? 
                <View style={styles.promoInput}>
                    <View style={{flex:3}}>
                    <TextInput placeholder='Masukkan Kode Promo'
                        value={promo} onChangeText={setPromo} autoCapitalize='none' autoCorrect={false}
                            ></TextInput>
                    </View>
                    <View style={{alignItems:'center', flex:1,justifyContent:'center'}}>
                        <Button title="Submit" onPress={() => postPromo({promo})} />
                    </View>
                </View> : <View style={styles.promoInput}>
                    <View>
                        <Text> Anda menggunakan kode promo <Text style={{fontWeight:'bold'}}>{order.kode_promo}</Text>  
                            <TouchableOpacity style={styles.itemNumber} onPress={() => {}}>
                                <Icon name='x' size={18}></Icon>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>}

                {data.map( item => (
                        <View style={styles.wrapper} key={item.id}>
                            <View>
                                <Image style={styles.cover} source={{ uri: item.gambar }}></Image>
                            </View>
                            <View style={{margin:5,justifyContent:'space-around'}}>
                                <Text style={{fontSize:20,fontWeight:'bold',marginHorizontal:10}}>{item.nama_produk}</Text>
                                
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:18,fontWeight:'500',marginHorizontal:10}}> Jumlah :</Text> 
                                    <TouchableOpacity style={styles.itemNumber} onPress={() => removeQuantity({id:item.id, quantity:item.qty})}>
                                        <Icon name='minus-circle' size={18}></Icon>
                                    </TouchableOpacity>
                                    <Text style={{fontSize:15, marginTop:3}}> {item.qty} </Text> 
                                    <TouchableOpacity style={styles.itemNumber}  onPress={() => addQuantity({id:item.id, quantity:item.qty})}>
                                        <Icon name='plus-circle' size={18}></Icon>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{marginLeft:10}}> Harga : 
                                    <NumberFormat
                                        value={item.harga} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        prefix={'Rp.'} 
                                        renderText={formattedValue =>
                                            <Text style={{fontSize:12,fontWeight:'500',marginHorizontal:10}}>{formattedValue}</Text>
                                        }/>
                                </Text>
                                <Text style={{marginLeft:8}}>
                                    Total :
                                    <PriceFormat value={item.total_harga}></PriceFormat>
                                </Text>
                            </View>
                            
                            <View style={styles.trash}>
                                <TouchableOpacity onPress={() => this.confirm({id:item.id,name:item.nama_produk,quantity:item.qty})}>
                                    <Icon name='trash-2' size={26}></Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                    // <Cartitem  key={item.id} id={item.id} name={item.nama_produk} quantity={item.qty} price={item.harga} totalprice={item.total_harga} gambar={item.gambar}/>
                    ))
                }

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
                    <View style={{alignItems:'center',flex:1,justifyContent:'center',paddingHorizontal:10}}>
                        <Button title="Pesan" onPress={() => {navigation.navigate('Checkout')}}/>
                    </View>
                </View>
        </View>
        }
        </ScrollView>
    </SafeAreaView>)
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
    trash:{
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    itemNumber: {
        marginTop:4,
    },
    backgroundImage:{
        justifyContent:'center',
        alignItems :'center',
    },
    container: {
        flex:1,
        marginTop:20,
        alignItems: 'center',
        padding:20,
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 30,
        marginRight: 5,
        marginLeft: 5,
        padding:20,
    }
})

