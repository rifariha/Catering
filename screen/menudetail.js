import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
const detail = () => {
    return (
        <View style={styles.container}>
        <ScrollView>
            <View>
                <Text>Ini menu detail</Text>
            </View>
        </ScrollView>
        </View>
    )
}

detail.navigationOptions = () =>{
    return {
        title:'Soto Ayam',
        headerTransparent: true
        // headerStyle: {
            // backgroundColor: 'transparent',
            // elevation: 0,
            // shadowOpacity: 0,
            // borderBottomWidth: 0,
        //   }
    };
}; 

export default detail

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
    },
})
