import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {ScrollView, FlatList} from 'react-native-gesture-handler'
const order = () => {
    return (<View>
        <ScrollView>
            <View>
                <Text>Ini menu order</Text>
            </View>
        </ScrollView>
    </View>)
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

