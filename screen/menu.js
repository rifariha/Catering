import React,{useState,useEffect} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Food from './components/food'
import api from './api/index'
import FloatingButton from './components/chatbutton';
import NotifBar from './components/notifbar';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

const menu = ({navigation}) => {
    
    const [data, setData] = useState([]);
    const [kategori, setKategori] = useState([]);
    const [amountNotif, setAmountNotif] = useState();
   

    useEffect(() => {
        const fetchData = async () => {
        const result = await api.get('/get-menu-bykategori.php?kategori=7');
            setData(result.data.result);
        };

        const fetchCategory = async () => {
        const kategori = await api.get('/get-kategori.php');
            setKategori(kategori.data.result);
        };

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

        fetchCategory();
        fetchAmountNotif();
        fetchData();
    }, []);

    const fetchOtherCategory = async (id) => {
        const result = await api.get('/get-menu-bykategori.php?kategori='+id);
            console.log(result.data.result)
            setData(result.data.result);
        };

    return (
        <View style={{backgroundColor:"#ecf0f1",flex:2}}>
            <View style={{flexDirection:'row', alignItems:"center",justifyContent:'center',backgroundColor:'white',padding:10,margin:10,elevation:1}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {kategori.map(item => (
                    <TouchableOpacity style={{paddingHorizontal:5}} key={item.id} onPress={() => fetchOtherCategory(item.id)}>
                        <View style={{backgroundColor:'#ecf0f1', borderRadius:20,}}>
                            <Text style={{paddingHorizontal:5}}> {item.kategori} </Text>
                        </View>
                    </TouchableOpacity>
                ))
                }
            </ScrollView>
            </View>
            <ScrollView>
                    {data == null ?  
                        <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'center',color: '#444444',marginTop: 30,marginRight: 5,marginLeft: 5,padding:20}}>
                            Makanan Tidak Tersedia</Text> :
                <View style={styles.container}>
                    {data.map(item =>(
                        <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('DetailMenu', {id: item.id,name:item.nama_produk})}}>
                            <Food nama={item.nama_produk} gambar={item.gambar}></Food>
                        </TouchableOpacity>
                    ))
                    }  
                </View>
                }
            </ScrollView>
                
            <FloatingButton/>
        </View>
    )
}

menu.navigationOptions = ({navigation}) => {
    return {
        title:'Daftar Menu',
        headerRight : () => <NotifBar navigation={navigation}/>
    };
}; 

export default menu

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        flexWrap:'wrap',
        marginBottom: 80,
        backgroundColor:'#ecf0f1',
        flex:1
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        padding: 10,
        margin: 10,
    },
    floatinBtn: {
        position: 'absolute',
        bottom: 20,
        right: 10,
  },
})
