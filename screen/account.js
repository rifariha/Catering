import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
const account = () => {
    return (
        <View>
        <ScrollView>
            <View>
                <Text>Ini menu akun</Text>
            </View>
        </ScrollView>
        </View>
    )
}

account.navigationOptions = () =>{
    return {
        title:'Akun Saya',
        tabBarLabel: 'ShoutOut',
        // tabBarIcon: () => (
        //     <Icon name="trash-2" size={25} />
        //   )
    };
};

export default account

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
