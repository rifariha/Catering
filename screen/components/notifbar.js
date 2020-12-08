import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image,Modal, Button, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import {Badge} from 'react-native-elements';
import api from '../api/index'

const notifbar = ({navigation}) => {
 
     const [amountNotif, setAmountNotif] = useState();
   

    useEffect(() => {
       
        const fetchAmountNotif = async () => {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const result = await api.get('/notifikasi-pesanan.php?user_id='+userdata.id);
            
            if(result.data.status == true)
            {
                setAmountNotif(result.data.count_notif);
            }
            else
            {
                setAmountNotif(0);
            }
        };

        fetchAmountNotif();
    }, []);

    const fetchAmountNotif = async () => {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const result = await api.get('/notifikasi-pesanan.php?user_id='+userdata.id);
            
            if(result.data.status == true)
            {
                setAmountNotif(result.data.count_notif);
                navigation.navigate('NotificationMenu')
            }
            else
            {
                setAmountNotif(0);
            }
        };

    return (
         <View>
            <TouchableOpacity onPress={() => fetchAmountNotif()}>
                <Icon name="bell" style={{paddingRight:20}} size={30}></Icon>
                {amountNotif != 0 ?  
                <Badge
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
              value={amountNotif}
              status="error"
              containerStyle={styles.badgeContainer}
            />
            : <View></View> }
            </TouchableOpacity>
        </View>
    )
}

export default notifbar


const styles = StyleSheet.create({
   
   badge: {
    borderRadius: 9,
    height: 18,
    minWidth: 0,
    width: 18
  },
  badgeContainer: {
    position: "absolute"
  },
  badgeText: {
    fontSize: 10,
    paddingHorizontal: 0
  }
})