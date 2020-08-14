import createDataContext from './createDataContext'
import api from '../api/index'
import AsyncStorage from '@react-native-community/async-storage'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'signin':
            return { errorMessage: '', name: action.payload }
        default:
            return state;
    }
};


const signup = (dispatch) =>  async({ email, name, password, passwordConfirmation, address }) => {

    if(password !== passwordConfirmation)
    {
        dispatch({ type: 'add_error', payload: 'Password yang anda masukan tidak sama' })
    }

    try {
        // const response = await api.post('/login', { email, password });
        // console.log(response.data.data.nama);
        console.log('wdwdwd')
        // await AsyncStorage.setItem('name', response.data.data.nama);
        // await AsyncStorage.getItem('name');
        // dispatch({ type: 'signin', payload: response.data.data.nama});
        // navigate('Menu');
    } catch (error) {

        console.log(error);
        dispatch({ type: 'add_error', payload: 'Kesalahan dalam pendaftaran, silahkan coba lagi' })
    }


}

const signin = (dispatch) => async ({ email, password }) => {
    //make api request
    try {
        const response = await api.post('/login', { email, password });
        // console.log(response.data.data.nama);
        // console.log('wdwdwd')
        await AsyncStorage.setItem('name', response.data.data.nama);
        await AsyncStorage.getItem('name');
        dispatch({ type: 'signin', payload: response.data.data.nama});
        navigate('Menu');
    } catch (error) {

        console.log(error);
        dispatch({ type: 'add_error', payload: 'Akun anda tidak ditemukan' })
    }
}


const signout = (dispatch) => {
    return () => {
        //make api request 
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup },
    { name: null, errorMessage: '' }
);