import React from 'react';
import { StyleSheet, View, TouchableOpacity,Image,Alert,Linking } from 'react-native';
import api from '../api/index'

const sendWa = async () => {
        const result = await api.get('/get-wa.php');
        try{
            if(result.data.status == true)
            {
                const wanumber = result.data.result.no_wa
                const link = 'https://api.whatsapp.com/send?phone='+wanumber+'&text=Halo, Saya ingin pesan makanan'
                Linking.openURL(link)
            } 
        }
        catch(err) 
        {
            console.log(err)
            alert('something wrong');
        }
    };

export default props => (
  <TouchableOpacity onPress={() => sendWa()} style={styles.floatinBtn}>
    <Image source={{ uri: "https://i.pinimg.com/originals/3a/8d/ad/3a8dad7f872542a95103cb9ca74dc415.png" }} style={{width: 60, height: 60}}></Image>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    floatinBtn: {
        position: 'absolute',
        bottom: 20,
        right: 10,
  }
})