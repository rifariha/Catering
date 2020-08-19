import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {ScrollView, FlatList} from 'react-native-gesture-handler'
import Orderitem from './components/orderitem'
const order = () => {
    return (<View>
        <ScrollView>
            <View>
                <Orderitem transactionCode="TRX-001" price="10000" date="2 May 2020"></Orderitem>
                <Orderitem transactionCode="TRX-001" price="10000" date="2 May 2020"></Orderitem>
                <Orderitem transactionCode="TRX-001" price="10000" date="2 May 2020"></Orderitem>
                <Orderitem transactionCode="TRX-001" price="10000" date="2 May 2020"></Orderitem>
                <Orderitem transactionCode="TRX-001" price="10000" date="2 May 2020"></Orderitem>
                <Orderitem transactionCode="TRX-001" price="10000" date="2 May 2020"></Orderitem>
                <Orderitem transactionCode="TRX-001" price="10000" date="2 May 2020"></Orderitem>
                <Orderitem transactionCode="TRX-001" price="10000" date="2 May 2020"></Orderitem>
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

