import React, {useContext,useState,useEffect,useCallback} from 'react'
import {StyleSheet, Text, View,Button,Image, Alert,RefreshControl, SafeAreaView} from 'react-native'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'
import {Context as AuthContext} from './context/AuthContext'
import userImage from '../assets/user.png'
const account = ({navigation}) => {

    const {signout} = useContext(AuthContext)
    const [data, setData] = useState('')
    const [refreshing, setRefreshing] = useState(false);

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);

            if (userdata !== null) {
                setData(userdata)
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    useEffect(() => {
        readData()
    }, [])

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = useCallback(() => {
            setRefreshing(true);
            readData()
            wait(2000).then(() => setRefreshing(false));
        }, []);

    return (
         <SafeAreaView style={{height:'100%', backgroundColor:'#ecf0f1'}}>
            <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                <View style={{backgroundColor:'white',borderRadius:20,margin:10,padding:5,elevation:2}}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width: '50%',height:undefined, aspectRatio:1}} source={userImage}></Image>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:30,fontWeight:'bold',padding:5,margin:10}}>{data.nama}</Text>
                    </View>
                    <View style={{flex:7,flexDirection:'row'}}>
                        <View style={{flex:6}}>
                            <Text style={styles.label}>Email :</Text>
                        </View>
                        <View style={{flex:1, paddingHorizontal:10}}>
                            <TouchableOpacity onPress={() =>  {navigation.navigate('UpdateProfile')}}>
                                <Icon name='edit'size={26}></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textStyle}>{data.email}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Alamat :</Text>
                        <Text style={styles.textStyle}>{data.alamat}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Telepon :</Text>
                        <Text style={styles.textStyle}>{data.nohp}</Text>
                    </View>
                    <View style={{borderRadius:20,padding:20}}>
                        <Button color="orange" title="logout" onPress={signout} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

account.navigationOptions = () =>{
    return {
        title:'Akun Saya',
    };
};

export default account

const styles = StyleSheet.create({
    textStyle : {
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 15,
        paddingHorizontal:10

    },
    label: {
        fontWeight:"bold", 
        fontSize:23,
        marginHorizontal: 10,
        paddingHorizontal:5
    }
})
