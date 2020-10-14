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
            const result = await api.get('/get-order.php?user_id='+userdata.id+'&status=1');
            
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

        const ambildata = async (id) => {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const result = await api.get('/get-order-bystatus.php?user_id='+userdata.id+'&status='+id);
            
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
            ambildata(1);
            wait(2000).then(() => setRefreshing(false));
        }, []);


        return (
         <SafeAreaView style={{height:'100%', backgroundColor:'#ecf0f1'}}>
             <View style={{flexDirection:'row', alignItems:"center",justifyContent:'center',backgroundColor:'white',padding:10,margin:10,elevation:1}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                
                <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => ambildata(1)}>
                    <View style={{backgroundColor:'#ecf0f1', borderRadius:20,}}>
                        <Text style={{paddingHorizontal:5}}> Pending </Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => ambildata(2)}>
                    <View style={{backgroundColor:'#ecf0f1', borderRadius:20,}}>
                        <Text style={{paddingHorizontal:5}}> Diproses </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => ambildata(3)}>
                    <View style={{backgroundColor:'#ecf0f1', borderRadius:20,}}>
                        <Text style={{paddingHorizontal:5}}> Dikonfirmasi </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => ambildata(4)}>
                    <View style={{backgroundColor:'#ecf0f1', borderRadius:20,}}>
                        <Text style={{paddingHorizontal:5}}> Dipacking </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => ambildata(5)}>
                    <View style={{backgroundColor:'#ecf0f1', borderRadius:20,}}>
                        <Text style={{paddingHorizontal:5}}> Diantar </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => ambildata(6)}>
                    <View style={{backgroundColor:'#ecf0f1', borderRadius:20,}}>
                        <Text style={{paddingHorizontal:5}}> Diterima </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => ambildata(7)}>
                    <View style={{backgroundColor:'#ecf0f1', borderRadius:20,}}>
                        <Text style={{paddingHorizontal:5}}> Ditolak </Text>
                    </View>
                </TouchableOpacity>

                </ScrollView>
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View>
                    {data.map(item => (
                        <View key={item.id}  style={styles.wrapper}>
                            <Orderitem transactionCode={item.invoice} price={item.grand_total} date={item.created_at}></Orderitem>
                            <View style={{justifyContent:"flex-end",alignItems:"flex-end",paddingHorizontal:12}}>
                                <TouchableOpacity onPress={() => {navigation.navigate('DetailOrder', {id:item.id})}}>
                                    <Text style={{fontSize:17,fontWeight:"400"}}>Lihat Pesanan</Text>
                                </TouchableOpacity>
                            </View>
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
    },
     wrapper : {
        borderColor:'black',
        elevation:1,
        margin:10,
        padding:10,
        backgroundColor:'white',
        borderRadius:20,
        // justifyContent:'space-around'
    },
})

