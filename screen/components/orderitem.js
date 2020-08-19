import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PriceFormat from './priceformat';
import Icon from 'react-native-vector-icons/Feather'

const orderitem = ({transactionCode, date, price}) => {
      
    return (
        <View style={styles.wrapper}>
            <View style={{margin:5,justifyContent:'space-around',flexDirection:'row', width:"100%"}}>
                <View style={{flex:2}}>  
                    <Text style={{fontSize:20,fontWeight:'bold',marginHorizontal:10}}>{transactionCode}</Text>
                    <Text style={{fontSize:18,fontWeight:'500',marginHorizontal:10}}>{date}</Text>
                </View>
                <View  style={{flex:1}}>
                    <PriceFormat value={price}></PriceFormat>
                </View>
            </View>
        </View>
    )
}

export default orderitem

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
})
