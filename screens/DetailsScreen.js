import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../hooks/authContext';
import { getDetails } from '../api';

const DetailsScreen = ({ navigation }) => {
  const auth = useAuth();
  const [details, setDetails] = useState(null); 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (auth.token) {
          const response = await getDetails(auth.token);
          setDetails(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
}, [auth.token]);



  return (
      <>
    <View style={styles.container}>
      {details ? ( // Render details if available
        <>
          <Text>ID : {details.user.id}</Text>
          <Text>Email : {details.user.email}</Text>
          <Text>Games played : {details.gamesPlayed}</Text>
          <Text>Games won : {details.gamesWon}</Text>
            <Text>Games lost : {details.gamesLost}</Text>
            <Text>Currentl games playing : {details.currentlyGamesPlaying}</Text>
        </>
      ) : (
        <Text>Loading...</Text> // Show loading indicator while details are being fetched
      )}
    </View>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />

</>  
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailsScreen;
