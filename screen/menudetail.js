import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
const detail = ({navigation}) => {
    const id = navigation.state.params.id
  
    return (
        <View style={styles.container}>
        <ScrollView>
            <View>
                <Text>Ini menu detail</Text>
                  <Text>itemId: {id}</Text>
            </View>
        </ScrollView>
        </View>
  );
}

detail.navigationOptions = ({navigation}) => {
    return {
        title:navigation.state.params.name,
        headerTransparent: false
    };
}; 

export default detail

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        flex: 1, 
        alignItems: 'center',
    },
})
