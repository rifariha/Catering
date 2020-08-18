import createDataContext from './createDataContext'
import api from '../api/index'
import AsyncStorage from '@react-native-community/async-storage'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'signin':
            return { errorMessage: '', userdata: action.payload }
        case 'signup':
            return { ...state, registerSuccess: action.payload}
        case 'signout' :
            return {userdata: null, errorMessage: '', registerSuccess:''}
        case 'clear_error_message':
            return {...state, errorMessage: '', registerSuccess:''}
            default:
            return state;
    }
};

const tryLocalSignin = dispatch => async() => {
    const userdata = await AsyncStorage.getItem('userdata');
    if(userdata) {
        dispatch({type:'signin', patyload:userdata})
        navigate('Menu')
    }else{
        navigate('Signin')
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
        console.log(response.data.data);
        // console.log('wdwdwd')
        await AsyncStorage.setItem('userdata', JSON.stringify(response.data.data));
        // await AsyncStorage.getItem('userdata');
        dispatch({type: 'signin', payload: response.data.data});
        navigate('Menu');
    } catch (error) {
        console.log(error);
        dispatch({ type: 'add_error', payload: 'Akun anda tidak ditemukan' })
    }
}


const signout = dispatch => async() => {
    await AsyncStorage.removeItem('userdata')
    dispatch({type:'signout'})
    navigate('loginflow')
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, ClearErrorMessage, tryLocalSignin },
    { userdata: null, errorMessage: '', registerSuccess: '' }
);