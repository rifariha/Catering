import React, {useContext} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import {Context as AuthContext} from './context/AuthContext'
const account = () => {

    const {signout} = useContext(AuthContext)

    return (
        <View>
        <ScrollView>
            <View>
                <Text>Ini menu akun</Text>
                <Button title="sign out" onPress={signout} />
            </View>
        </ScrollView>
        </View>
    )
}

account.navigationOptions = () =>{
    return {
        title:'Akun Saya',
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
