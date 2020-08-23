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
        const formData = new FormData();
        formData.append("email", email);
        formData.append("nama", name);
        formData.append("password", password);
        formData.append("nohp", phone);
        formData.append("alamat", address);

        const response = await api.post('/register-user.php', formData);
        console.log(response.data.status);
        if(response.data.status === false)
        {
            dispatch({ type: 'add_error', payload: 'Kesalahan dalam pendaftaran, silahkan coba lagi' })    
        }
        else
        {
            dispatch({ type: 'signup', payload: 'Pendaftaran Berhasil, silahkan login' });
            navigate('Signin');
        }
    } catch (error) {

        console.log(error);
        dispatch({ type: 'add_error', payload: 'Kesalahan dalam pendaftaran, silahkan coba lagi' })
    }


}

const signin = (dispatch) => async ({ email, password }) => {
    //make api request
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const response = await api.post('/login.php', formData);
        console.log(response.data.result);
        await AsyncStorage.setItem('userdata', JSON.stringify(response.data.result));
        // await AsyncStorage.getItem('userdata');
        dispatch({type: 'signin', payload: response.data.result});
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