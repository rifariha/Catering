import React from 'react'
import Cartitem from './components/cartitem'
import {StyleSheet, Text, View} from 'react-native'
import {ScrollView, FlatList, TouchableOpacity} from 'react-native-gesture-handler'
const keranjang = ({navigation}) => {
    return (
    
    <View>
        <ScrollView>
            <Cartitem name='Soto Ayam' quantity='2' price='20000' gambar='https://awsimages.detik.net.id/community/media/visual/2020/01/20/dab49f82-0ba0-4986-b834-fe6dba66bc52.jpeg?w=700&q=90'/>
            <Cartitem name='Sambal Ikan Dencis'  quantity='1' price='15000' gambar='https://img-global.cpcdn.com/recipes/714aeff14f019f83/751x532cq70/sambal-ikan-kembung-foto-resep-utama.jpg'/>
            <Cartitem name='Sambal Goreng Udang' quantity='1' price='25000' gambar='https://selerasa.com/wp-content/uploads/2015/07/images_ikan_resep_udang_28-udang-sambal-pete.jpg'/>
            <Cartitem quantity='1' price='35000' name='Rendang' gambar='https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/11/Resep-Rendang-padang.jpg?fit=2837%2C3283&ssl=1'/>
            <Cartitem name='Ayam Goreng' quantity='1' price='18000'gambar='https://keeprecipes.com/sites/keeprecipes/files/104127_1419594390_0.jpg'/>
        </ScrollView>
    </View>)
}

keranjang.navigationOptions = () =>{
    return {
        title:'Keranjang Anda',
    };
};

export default keranjang

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

