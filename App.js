import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { AuthContextProvider, useAuth } from './hooks/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailsScreen from './screens/DetailsScreen';
const ProtectedStack = createNativeStackNavigator();

const PublicStack = createNativeStackNavigator();


function App() {
  

  return (
    <AuthContextProvider>

      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthContextProvider>
  );
}




function Routes() {
  const auth = useAuth();

  

  return auth.token ? <ProtectedRoutes /> : <PublicRoutes />;
}

function ProtectedRoutes() {
  return (
    <ProtectedStack.Navigator>
      <ProtectedStack.Screen name="Home" component={HomeScreen} />
      <ProtectedStack.Screen name="Details" component={DetailsScreen} />
    </ProtectedStack.Navigator>
  );
}

function PublicRoutes() {
  return (
    <PublicStack.Navigator>
      <PublicStack.Screen name="Login" component={LoginScreen} />
      <PublicStack.Screen name="Register" component={RegisterScreen} />
    </PublicStack.Navigator>
  );
}
export default App;
