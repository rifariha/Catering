import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Food from './components/food'
import api from './api/index'
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler'
const menu = ({navigation}) => {
    
    const [data, setData] = useState([]);
 
    useEffect(() => {
        const fetchData = async () => {
        const result = await api.get('/get-menu-bykategori.php?kategori=7');
            setData(result.data.result);
        };

        fetchData();
    }, []);

    return (
        <View style={{backgroundColor:"#ecf0f1"}}>
        <ScrollView>
            <View style={styles.container}>
                {data.map(item =>(
                    <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('DetailMenu', {id: item.id,name:item.nama_produk})}}>
                        <Food key={item.id} nama={item.nama_produk} gambar={item.gambar}></Food>
                    </TouchableOpacity>
                ))
                }

                {/* <TouchableOpacity onPress={() => navigation.navigate('DetailMenu')}>
                    <Food nama='Soto Ayam' gambar='https://awsimages.detik.net.id/community/media/visual/2020/01/20/dab49f82-0ba0-4986-b834-fe6dba66bc52.jpeg?w=700&q=90'></Food>
                </TouchableOpacity> */}

                {/* <Food nama='Sambal Ikan Dencis' gambar='https://img-global.cpcdn.com/recipes/714aeff14f019f83/751x532cq70/sambal-ikan-kembung-foto-resep-utama.jpg'></Food>
                <Food nama='Rendang' gambar='https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/11/Resep-Rendang-padang.jpg?fit=2837%2C3283&ssl=1'></Food>
                <Food nama='Mie Goreng' gambar='https://www.masakapahariini.com/wp-content/uploads/2018/04/cara-membuat-mie-goreng-telur-500x300.jpg'></Food>

                <Food nama='Ayam Goreng' gambar='https://keeprecipes.com/sites/keeprecipes/files/104127_1419594390_0.jpg'></Food>
                <Food nama='Ayam Sambal Ijo' gambar='https://craftlog.com/m/i/10531004=s1280=h960'></Food>
                <Food nama='Sambal Goreng Udang' gambar='https://selerasa.com/wp-content/uploads/2015/07/images_ikan_resep_udang_28-udang-sambal-pete.jpg'></Food>
                <Food nama='Cumi Goreng Tepung' gambar='https://www.resepistimewa.com/wp-content/uploads/cumi-goreng-tepung.jpg'></Food> */}
            </View>
        </ScrollView>
        </View>
    )
}

menu.navigationOptions = () =>{
    return {
        title:'Daftar Menu',
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
        marginVertical:25,
        backgroundColor:'#ecf0f1',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        padding: 10,
        margin: 10,
    }
})
