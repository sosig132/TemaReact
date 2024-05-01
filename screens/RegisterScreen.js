import RegisterComponent from '../components/RegisterComponent';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuth } from '../hooks/authContext';


const RegisterScreen = ({ navigation }) => {
    const auth = useAuth();

    return (
        <>
            <RegisterComponent onSubmit={auth.register} />
            <Button title="Go to login" onPress={()=>navigation.navigate('Login')}></Button>

        </>
    );
}


export default RegisterScreen;