import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, Button, Alert, Modal, TouchableHighlight,TextInput } from 'react-native'
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import api from './api/index'
import Cartitem from './components/cartitem';
import NumberFormat from 'react-number-format'
import DocumentPicker from 'react-native-document-picker';
import { navigate } from './navigationRef'
import StarRating from 'react-native-star-rating';


const orderdetail = ({navigation}) => {
    const id = navigation.state.params.id
    const read = navigation.state.params.read 
    
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({})
    const [orderitem, setOrderitem] = useState([])
    const [comment, setComment] = useState('')
    const [singleFile, setSingleFile] = useState(null);
    const [starCount, setStarCount] = useState(3.5);

    confirm = ({id}) => {
        Alert.alert(
          'Apakah anda yakin ?',
          'Pesanan ini akan dibatalkan ',
          [
            {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
            {text: 'YES', onPress: () => deleteOrder({id})},
          ]
        );
      }

    useEffect(() => {
        
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);
            if(read != 1)
            {
                const result = await api.get('/get-order-detail.php?user_id='+userdata.id+'&order_id='+id);
                setData(result.data.result);
                setOrderitem(result.data.result.orderItems)
            }
            else
            {
                const result = await api.get('/get-order-detail.php?user_id='+userdata.id+'&order_id='+id+'&read='+read);
                setData(result.data.result);
                setOrderitem(result.data.result.orderItems)
            }
        };

        fetchData();
    }, []);
    
    const ambildata = async () => {
        const value = await AsyncStorage.getItem('userdata')
        const userdata = JSON.parse(value);
        const result = await api.get('/get-order-detail.php?user_id='+userdata.id+'&order_id='+id);
        setData(result.data.result);
        setOrderitem(result.data.result.orderItems)
    };

    const deleteOrder = async({id}) => {
        try {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);
            const formData = new FormData();
            formData.append("user_id", userdata.id);
            formData.append("order_id", id);
            const response = await api.post('/batalkan-pesanan.php', formData);
            console.log(id);
            console.log(response.data.status);
            if (response.data.status == true) {
                alert(response.data.message);
                navigate('Order')
            }

        } catch (error) {
            console.log(error);
        }
    }

     const confirmTerima = async({id,rating,comment}) => {
        try {
            const value = await AsyncStorage.getItem('userdata')
            const userdata = JSON.parse(value);
            const formData = new FormData();
            formData.append("user_id", userdata.id);
            formData.append("rating", rating);
            formData.append("comment", comment);
            formData.append("order_id", id);
            const response = await api.post('/pesanan-diterima.php', formData);
            console.log(id);
            console.log(response.data.status);
            if (response.data.status == true) {
                alert(response.data.message);
                navigate('Order')
            }

        } catch (error) {
            console.log(error);
        }
    }
  
  const uploadImage = async ({id}) => {
    //Check if any file is selected or not
    if (singleFile != null) 
    {   
        try {
            const value = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(value);
            const fileToUpload = singleFile;

            const formData = new FormData();
            formData.append("user_id", userdata.id);
            formData.append("order_id", id);
            formData.append("gambar",  fileToUpload);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': "application/x-www-form-urlencoded",
                    'Accept': 'application/json'
                },
            };
            const response = await api.post('/upload-bukti.php', formData, config);
            if(response.data.status == true)
            {
                ambildata()
                alert(response.data.message);
            }
            else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    else {
        alert('Please Select File first');
    }

  };

  const selectFile = async () => {
    //Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        //Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      //Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

    return (
        <View style={styles.container}>
        <ScrollView>
            {data != null ? 
            <View>
                <View style={{padding:10}}>
                     <Text style={{fontSize:20, fontWeight:'800'}}>Tgl.Transaksi : {data.created_at}</Text>
                    <Text style={{fontSize:20, fontWeight:'800'}}>No.Invoice : {data.invoice}</Text>
                    <Text style={{fontSize:20, fontWeight:'800'}}>Status Pembayaran : <Text style={{fontWeight:"bold"}}>{data.status}</Text></Text>
                </View>
                <Text style={{fontSize:25, fontWeight:'bold',padding:10}}>
                    Pesanan:
                </Text>
                {orderitem.map(item =>(
                    <Cartitem key={item.id} id={item.id} name={item.nama_produk} quantity={item.qty} price={item.harga} totalprice={item.total_harga} gambar={item.gambar}/>
                ))}
                <View style={{padding:10}}>
                    <Text style={{fontSize:20, fontWeight:'800'}}>Total Belanja : 
                    <NumberFormat 
                            value={data.subtotal} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp.'} 
                            renderText={formattedValue =>
                                <Text style={{fontSize:20,fontWeight:'800',marginHorizontal:10}}> {formattedValue}</Text>
                        }/>
                    </Text>
                    <Text style={{fontSize:20, fontWeight:'800'}}>Kode Promo : {data.kode_promo == null ? "-" : data.kode_promo}</Text> 
                    <Text style={{fontSize:20, fontWeight:'800'}}>Diskon : 
                    <NumberFormat 
                            value={data.diskon == null ? 0 : data.diskon} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp.'} 
                            renderText={formattedValue =>
                                <Text style={{fontSize:20,fontWeight:'800',marginHorizontal:10}}> {formattedValue}</Text>
                        }/>
                    </Text>
                    <Text style={{fontSize:20, fontWeight:'800'}}>Total Bayar : 
                    <NumberFormat 
                            value={data.subtotal} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp.'} 
                            renderText={formattedValue =>
                                <Text style={{fontSize:20,fontWeight:'bold',marginHorizontal:10}}> {formattedValue}</Text>
                        }/>
                    </Text>
                    {data.status == 'Pending' ? 
                         <View style={styles.container}>
                             <Text style={{fontSize:20,fontWeight:'bold'}}>Upload Bukti Transfer : </Text>
                            {singleFile != null ? (
                                <View style={{alignItems:"center",justifyContent:"center"}}>
                                    <Image source={{uri:singleFile.uri}} style={{width: 200, height: 200}} />
                                </View>
                            ) : null}
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={() => selectFile()}>
                                <Text style={styles.buttonTextStyle}>Pilih Foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={() => uploadImage({id:data.id})}>
                                <Text style={styles.buttonTextStyle}>Upload</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonCancelStyle}
                                activeOpacity={0.5}
                                onPress={() => this.confirm({id:data.id})}>
                                <Text style={styles.buttonTextStyle}>Batalkan Pesanan</Text>
                            </TouchableOpacity>
                        </View>         
                        : null
                    }

                    {data.status == 'Diproses' ? 
                         <View style={styles.container}>
                             <Text style={{fontSize:20,fontWeight:'bold'}}>Bukti Transfer : </Text>
                            <View style={{alignItems:"center",justifyContent:"center"}}>
                                <Image source={{uri:data.bukti_transfer}} style={{width: 200, height: 200}} />
                            </View>
                        </View>         
                        : null
                    }

                    {data.status == 'Diantar' ? 
                         <View style={styles.container}>
                             <TouchableOpacity
                                style={styles.buttonConfirmStyle}
                                activeOpacity={0.5}
                                // onPress={() => this.confirmTerima({id:data.id})}
                                onPress={() => {setModalVisible(true)}}
                                >
                                <Text style={styles.buttonTextStyle}>Konfirmasi Pesanan Diterima</Text>
                            </TouchableOpacity>
                            <Modal
                                animationType="fade"
                                transparent
                                visible={modalVisible}
                                onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                }}
                            >
                                <View style={styles.modalBackground}>
                                <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{fontSize:15,fontWeight:'bold'}}>Bagaimana tingkat kepuasan anda ?</Text> 
                                    <Text></Text>
                                    <StarRating disabled={false} maxStars={5} rating={starCount} selectedStar={(rating) => setStarCount(rating)}/>
                                    <TextInput style={styles.textAreaInput} placeholder='Berikan Komentar'
                                        value={comment} onChangeText={setComment} autoCapitalize='none' autoCorrect={false}
                                    ></TextInput>
                                    <View style={{flexDirection:'row',paddingVertical:10}}> 
                                        <View>
                                            <TouchableHighlight  style={{paddingHorizontal:20}} onPress={() => {setModalVisible(false)}}>
                                                <Text  style={{fontWeight:'bold'}}>Cancel</Text>
                                            </TouchableHighlight>
                                        </View>
                                        <View>
                                            <TouchableHighlight  style={{paddingHorizontal:20}} onPress={() => confirmTerima({id:data.id,rating:starCount,comment:comment})}>
                                                <Text  style={{fontWeight:'bold'}}>Submit</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                                </View>
                                </View>
                            </Modal>
                        </View>         
                        : null
                    }
                </View>
            </View>
            : null }
        </ScrollView>
        
        </View>
  );
}

orderdetail.navigationOptions = ({navigation}) => {
    return {
        title:'Detail Pesanan',
        headerTransparent: false
    };
}; 

export default orderdetail

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        flex: 1, 
        paddingVertical:10,
        backgroundColor:'white',
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonCancelStyle: {
        backgroundColor: 'red',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: 'red',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 30,
    },
    buttonConfirmStyle: {
        backgroundColor: 'green',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: 'green',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 30,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textAreaInput : {
        fontSize: 13,
        color:'#000',
        width:"80%",
        paddingHorizontal:10,
        paddingVertical:0,
        fontFamily:'Raleway-Bold',
        borderColor: 'grey',
        borderWidth: 1,
        margin:15,
        height:80,
        borderRadius:5,
    },
    modalBackground: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
},
    textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width:"80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

})
	