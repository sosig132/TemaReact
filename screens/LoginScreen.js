import LoginComponent from '../components/LoginComponent';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuth } from '../hooks/authContext';


const LoginScreen = ({ navigation }) => {
    const auth = useAuth();

    return (
        <>
            <LoginComponent onSubmit={(email, password)=>{auth.login(email, password); console.log(email,password)}} />

            <Button title="Go to register" onPress={()=>navigation.navigate('Register')}></Button>
        </>
    );
}


export default LoginScreen;