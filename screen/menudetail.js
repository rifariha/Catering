import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
import api from './api/index'
import PriceFormat from './components/priceformat';


const detail = ({navigation}) => {
    const id = navigation.state.params.id
    const [data, setData] = useState({})

     useEffect(() => {
        const fetchData = async () => {
        const result = await api.get('/get-menu-detail.php?id='+id);
            setData(result.data.result);
        };

        fetchData();
    }, []);
    return (
        <View style={styles.container}>
        <ScrollView>
            <View>
                    <View>
                        <Image source={{uri:data.gambar}}></Image>
                    </View>
                    <View>
                        <Text>{data.nama_produk}</Text>
                        <PriceFormat value={data.harga}></PriceFormat>
                        <Text>{data.deskripsi}</Text>
                    </View>
            </View>
        </ScrollView>
        </View>
  );
}

detail.navigationOptions = ({navigation}) => {
    return {
        title:navigation.state.params.name,
        headerTransparent: false
    };
}; 

export default detail

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        flex: 1, 
        alignItems: 'center',
    },
})
