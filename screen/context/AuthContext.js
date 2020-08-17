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
        case 'signup':
            return { ...state, registerSuccess: action.payload}
        case 'clear_error_message':
            return {...state, errorMessage: '', registerSuccess:''}
            default:
            return state;
    }
};

const tryLocalSignin = dispatch => async() => {
    const name = await AsyncStorage.getItem('name');
    if(name) {
        dispatch({type:'signin', patyload:name})
        navigate('Menu')
    }else{
        navigate('Singin')
    }
}

const ClearErrorMessage = dispatch => () => {
     dispatch({ type: 'clear error message'});
};


const signup = (dispatch) => async ({ email, name, password, passwordConfirmation, address, phone}) => {

    if (password !== passwordConfirmation) {
        dispatch({ type: 'add_error', payload: 'Password yang anda masukan tidak sama' })
    }
    try {
        const response = await api.post('/register', { email, password, phone, address, name});
        console.log(response.data);
        dispatch({ type: 'signup', payload: 'Pendaftaran Berhasil, silahkan login' });
        navigate('Signin');
    } catch (error) {

        console.log(error);
        dispatch({ type: 'add_error', payload: 'Kesalahan dalam pendaftaran, silahkan coba lagi' })
    }


}

const signin = (dispatch) => async ({ email, password }) => {
    //make api request
    try {
        const response = await api.post('/login', { email, password });
        console.log(response.data.data.nama);
        // console.log('wdwdwd')
        await AsyncStorage.setItem('name', response.data.data.nama);
        // await AsyncStorage.getItem('name');
        dispatch({type: 'signin', payload: response.data.data.nama});
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
    { signin, signout, signup, ClearErrorMessage, tryLocalSignin },
    { name: null, errorMessage: '', registerSuccess: '' }
);