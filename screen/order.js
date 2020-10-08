import React, {useContext, useState, useEffect, useCallback} from 'react'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import {StyleSheet, Text, View, Alert,RefreshControl, SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from './api/index'
import Orderitem from './components/orderitem'

const order = ({navigation}) => {

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const result = await api.get('/get-order.php?user_id='+userdata.id);
            
            if(result.data.status == true)
            {
                setData(result.data.result);
                console.log(data);
            } 
            else 
            {
                console.log(order)
            }
        };

        fetchData();
    }, []);

        const ambildata = async () => {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const result = await api.get('/get-order.php?user_id='+userdata.id);
            
            if(result.data.status == true)
            {
                setData(result.data.result);
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
            ambildata();
            wait(2000).then(() => setRefreshing(false));
        }, []);
    
        return (
         <SafeAreaView style={{height:'100%', backgroundColor:'#ecf0f1'}}>
            <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View>
                    {data.map(item => (
                        <View key={item.id}>
                            <Orderitem transactionCode={item.invoice} price={item.grand_total} date={item.created_at}></Orderitem>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>)
}

order.navigationOptions = () =>{
    return {
        title:'Riwayat Pesanan',
    };
};

export default order

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
    }
})

