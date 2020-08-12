import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function food(props) {
    return (
        <View style={styles.card}>
            <View>
                <Image style={styles.cover} source={{ uri: props.gambar }}></Image>
            </View>
            <Text style={styles.foodName}>{props.nama}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cover: {
        width: 150,
        height: 150,
        borderRadius: 20,
        padding:5,
        borderBottomWidth:2
    },
    container: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    card: {
        margin: 10,
        borderColor: '#cccccc',
        borderRadius: 20,
        borderWidth: 0.5,
        width:150,
        // elevation: 2,
        flexDirection: 'column',
    },
    foodName: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 3,
        marginRight: 5,
        marginLeft: 5,
        padding:20,
    }

})