import React, {useState} from 'react'
import { StyleSheet, Text, View, Image,Modal, Button, Alert } from 'react-native'
import PriceFormat from './priceformat';
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';

const cartitem = ({name, quantity, gambar, price}) => {
 
      
    return (
        <View style={styles.wrapper}>
            <View>
                <Image style={styles.cover} source={{ uri: gambar }}></Image>
            </View>
            <View style={{margin:5,justifyContent:'space-around'}}>
                <Text style={{fontSize:20,fontWeight:'bold',marginHorizontal:10}}>{name}</Text>
                <Text style={{fontSize:18,fontWeight:'500',marginHorizontal:10}}>Jumlah : {quantity}</Text>
                <PriceFormat value={price}></PriceFormat>
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
})