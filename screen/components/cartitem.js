import React, {useState} from 'react'
import { StyleSheet, Text, View, Image,Modal, Button, Alert } from 'react-native'
import PriceFormat from './priceformat';
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../api/index'
import AsyncStorage from '@react-native-community/async-storage'
import NumberFormat from 'react-number-format'

const cartitem = ({id,name, quantity, gambar, price, totalprice}) => {
    
    const [quantities, setQuantity] = useState(quantity)
    const [order, setOrder] = useState('');
    const [data, setData] = useState([]);

    confirm = (name, quantity) => {
        Alert.alert(
          'Apakah anda yakin menghapus item ini ?',
          name + ' ' + quantity +' porsi',
          [
            {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
            {text: 'YES', onPress: () => console.log('YES Pressed')},
          ]
        );
      }
      
    const addQuantity = async ({id,quantities}) => {
        try {
            // console.log(id,quantities);
            const formData = new FormData();
            formData.append("cart_items", id);
            formData.append("qty", parseInt(quantities)+1);
            const response = await api.post('/update-cart.php', formData);
            console.log(response.data.status);
            if (response.data.status == true) {
                const value = await AsyncStorage.getItem('userdata');
                const userdata = JSON.parse(value);
                const result = await api.get('/get-cart.php?user_id='+userdata.id);
                console.log(result.data.result)
                setOrder(result.data.result);
                setData(result.data.result.cart_items);
            }

        } catch (error) {
            console.log(error);
        }
    }

     const removeQuantity = async ({id,quantities}) => {
        try {
            // console.log(id,quantities);
            const formData = new FormData();
            formData.append("cart_items", id);
            formData.append("qty", parseInt(quantities)-1);
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

    return (
        <View style={styles.wrapper}>
            <View>
                <Image style={styles.cover} source={{ uri: gambar }}></Image>
            </View>
            <View style={{margin:5,justifyContent:'space-around'}}>
                <Text style={{fontSize:20,fontWeight:'bold',marginHorizontal:10}}>{name}</Text>
                
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:18,fontWeight:'500',marginHorizontal:10}}> Jumlah :</Text> 
                    <TouchableOpacity style={styles.itemNumber} onPress={() => removeQuantity({id,quantities})}>
                        <Icon name='minus-circle' size={18}></Icon>
                    </TouchableOpacity>
                     <Text style={{fontSize:15, marginTop:3}}> {quantity} </Text> 
                    <TouchableOpacity style={styles.itemNumber}  onPress={() => addQuantity({id,quantities})}>
                        <Icon name='plus-circle' size={18}></Icon>
                    </TouchableOpacity>
                </View>
                <Text style={{marginLeft:10}}> Harga : 
                    <NumberFormat 
                        value={price} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'Rp.'} 
                        renderText={formattedValue =>
                            <Text style={{fontSize:12,fontWeight:'500',marginHorizontal:10}}>{formattedValue}</Text>
                        }/>
                </Text>
                <Text style={{marginLeft:8}}>
                    Total :
                    <PriceFormat value={totalprice}></PriceFormat>
                </Text>
            </View>
            
            <View style={styles.trash}>
                <TouchableOpacity onPress={() => this.confirm(name,quantity)}>
                    <Icon name='trash-2' size={26}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default cartitem

const styles = StyleSheet.create({
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
    }
})
