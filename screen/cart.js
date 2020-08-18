import React from 'react'
import Cartitem from './components/cartitem'
import {StyleSheet, Text, View, Button} from 'react-native'
import PriceFormat from './components/priceformat';
import {ScrollView, FlatList} from 'react-native-gesture-handler'
const keranjang = ({navigation}) => {
    return (
    
    <View style={{height:'100%', backgroundColor:'#ecf0f1'}}>
        <View style={{flex:9}}> 
            <ScrollView>
                <Cartitem name='Soto Ayam' quantity='2' price='20000' gambar='https://awsimages.detik.net.id/community/media/visual/2020/01/20/dab49f82-0ba0-4986-b834-fe6dba66bc52.jpeg?w=700&q=90'/>
                <Cartitem name='Sambal Ikan Dencis'  quantity='1' price='15000' gambar='https://img-global.cpcdn.com/recipes/714aeff14f019f83/751x532cq70/sambal-ikan-kembung-foto-resep-utama.jpg'/>
                <Cartitem name='Sambal Goreng Udang' quantity='1' price='25000' gambar='https://selerasa.com/wp-content/uploads/2015/07/images_ikan_resep_udang_28-udang-sambal-pete.jpg'/>
                <Cartitem quantity='1' price='35000' name='Rendang' gambar='https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/11/Resep-Rendang-padang.jpg?fit=2837%2C3283&ssl=1'/>
                <Cartitem name='Ayam Goreng' quantity='1' price='18000'gambar='https://keeprecipes.com/sites/keeprecipes/files/104127_1419594390_0.jpg'/>
                <Cartitem name='Ayam Goreng' quantity='1' price='18000'gambar='https://keeprecipes.com/sites/keeprecipes/files/104127_1419594390_0.jpg'/>
            </ScrollView>
        </View>
        <View style={{flex:1,backgroundColor:'white',flexDirection:'row'}}>
            <View style={{alignItems:'flex-start',justifyContent:"flex-start",flex:3,flexDirection:'column',margin:10}}>
                <Text style={{fontSize:18,alignItems:'center',justifyContent:'center',fontWeight:'500',paddingHorizontal:10}}>Total Pesanan</Text>
                <Text style={{fontSize:18,alignItems:'flex-end',justifyContent:'center',fontWeight:'bold',paddingHorizontal:10}}>
                    <PriceFormat value='20000'></PriceFormat>
                </Text>
            </View>
            <View style={{alignItems:'center', flex:1,justifyContent:'center'}}>
                <Button title="Pesan"/>
            </View>
        </View>
    </View>)
}

keranjang.navigationOptions = () =>{
    return {
        title:'Pesanan Anda',
    };
};

export default keranjang

const styles = StyleSheet.create({
})

