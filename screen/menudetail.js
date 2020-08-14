import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Food from './components/food'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
const menu = () => {
    return (
        <View>
        <ScrollView>
            <View>
                <Text>Ini menu detail</Text>
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
