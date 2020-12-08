import React, {useContext, useState, useEffect, useCallback} from 'react'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import {StyleSheet, Text, View, Alert,RefreshControl, SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from './api/index'

const notification = ({navigation}) => {

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const result = await api.get('/notifikasi-pesanan.php?user_id='+userdata.id);
            
            if(result.data.status == true)
            {
                setData(result.data.result);
            } 
            else 
            {
                console.log('ada kesalahan')
            }
        };

        fetchData();
    }, []);

        const ambildata = async (id) => {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const result = await api.get('/get-order-bystatus.php?user_id='+userdata.id+'&status='+id);
            
            if(result.data.status == true)
            {
                setData(result.data.result);
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
            ambildata(1);
            wait(2000).then(() => setRefreshing(false));
        }, []);


        return (
         <SafeAreaView style={{height:'100%', backgroundColor:'#ecf0f1'}}>
            
            <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View>
                    {data.map(item => (
                        <View key={item.order_id}  style={styles.wrapper}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{margin:5,justifyContent:'space-around',flexDirection:'row', width:"100%"}}>
                                    <View style={{flex:1}}>  
                                        <Text style={{fontSize:20,fontWeight:'bold',marginHorizontal:10}}>{item.message_notif}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{justifyContent:"flex-end",alignItems:"flex-end",paddingHorizontal:12}}>
                                <TouchableOpacity onPress={() => {navigation.navigate('DetailOrder', {id:item.order_id,read:1})}}>
                                    <Text style={{fontSize:17,fontWeight:"400"}}>Lihat Pesanan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>)
}

notification.navigationOptions = () => {
    return {
        title:'Notifikasi',
    };
};

export default notification

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 80
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        padding: 10,
        margin: 10
    },
     wrapper : {
        borderColor:'black',
        elevation:1,
        margin:10,
        padding:10,
        backgroundColor:'white',
        // justifyContent:'space-around'
    },
})

