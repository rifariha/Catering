import React, {useState} from 'react'
import { StyleSheet, Text, View, Image,Modal, Button, Alert } from 'react-native'
import PriceFormat from './priceformat';
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';

const cartitem = ({name, quantity, gambar, price}) => {
    
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
      
    return (
        <View style={styles.wrapper}>
            <View>
                <Image style={styles.cover} source={{ uri: gambar }}></Image>
            </View>
            <View style={{margin:5,justifyContent:'space-around'}}>
                <Text style={{fontSize:20,fontWeight:'bold',marginHorizontal:10}}>{name}</Text>
                
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:18,fontWeight:'500',marginHorizontal:10}}> Jumlah :</Text> 
                    <TouchableOpacity style={styles.itemNumber} onPress={() => this.confirm(name,quantity)}>
                        <Icon name='minus-circle' size={18}></Icon>
                    </TouchableOpacity>
                     <Text style={{fontSize:15, marginTop:3}}> {quantity} </Text> 
                    <TouchableOpacity style={styles.itemNumber}  onPress={() => this.confirm(name,quantity)}>
                        <Icon name='plus-circle' size={18}></Icon>
                    </TouchableOpacity>
                </View>
                <PriceFormat value={price}></PriceFormat>
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
