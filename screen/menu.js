import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Food from './components/food'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
const menu = () => {
    return (
        <View>
        <Text style={styles.textStyle}>Menu Hari Ini</Text>
        <ScrollView>
            <View style={styles.container}>
                <Food nama='Soto Ayam' gambar='https://awsimages.detik.net.id/community/media/visual/2020/01/20/dab49f82-0ba0-4986-b834-fe6dba66bc52.jpeg?w=700&q=90'></Food>
                <Food nama='Sambal Ikan Dencis' gambar='https://img-global.cpcdn.com/recipes/714aeff14f019f83/751x532cq70/sambal-ikan-kembung-foto-resep-utama.jpg'></Food>
                <Food nama='Rendang' gambar='https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/11/Resep-Rendang-padang.jpg?fit=2837%2C3283&ssl=1'></Food>
                <Food nama='Mie Goreng' gambar='https://lh3.googleusercontent.com/proxy/pRQPIwzjipBIhsBcc-U1A6bVSb6obrvY5GqvQUDKbX8wm_1CnOkuKJi4S7W-elar3-rwTVcvOPBzsaQ2Bwk3IZpZjnJOiXCRUSHHyClThN0wfIX_UFfn81LpmDSddZA'></Food>
                <Food nama='Ayam Goreng' gambar='https://keeprecipes.com/sites/keeprecipes/files/104127_1419594390_0.jpg'></Food>
                <Food nama='Ayam Sambal Ijo' gambar='https://craftlog.com/m/i/10531004=s1280=h960'></Food>
                <Food nama='Sambal Goreng Udang' gambar='https://selerasa.com/wp-content/uploads/2015/07/images_ikan_resep_udang_28-udang-sambal-pete.jpg'></Food>
                <Food nama='Cumi Goreng Tepung' gambar='https://www.resepistimewa.com/wp-content/uploads/cumi-goreng-tepung.jpg'></Food>
            </View>
        </ScrollView>
        </View>
    )
}

export default menu

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        flexWrap:'wrap',
        marginBottom:80,
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
