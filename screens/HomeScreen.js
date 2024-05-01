import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { getGames } from '../api';
import { useAuth } from '../hooks/authContext';
import {create, join} from '../api';

const HomeScreen = ({ navigation }) => {
    const auth = useAuth();
    const [games, setGames] = useState(null); // Initialize details state as null
    const [containerExpanded, setContainerExpanded] = useState(false); // Keep track of container expansion state

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (auth.token) {
                    const response = await getGames(auth.token);
                    setGames(response); // Update details state with fetched data
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchDetails(); // Call the fetchDetails function when the component mounts
    }, [auth.token]); // Re-run effect when auth token changes

    // Toggle container expansion
    const toggleContainerExpansion = () => {
        setContainerExpanded((prevContainerExpanded) => !prevContainerExpanded);
    };


    const createGame = async () => {
        try {
            if (auth.token) {
                const response = await create(auth.token);
                console.log(response);
                //refresh the games
                const games = await getGames(auth.token);
                setGames(games);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const join = (id) => {
        try{
            if(auth.token){
                const response = joinGame(auth.token, id);
                console.log(response);
            }
        }
        catch(error){
            console.error(error);
        }
        console.log(id);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text>Home Screen</Text>
                {games ? (
                    <Button
                        title={containerExpanded ? "Collapse Games" : "Expand Games"}
                        onPress={toggleContainerExpansion}
                    />
                ) : (
                    <Text>Loading...</Text>
                )}
                {containerExpanded && games && (
                    <View style={styles.gamesContainer}>
                        <Text>Games: {games.total}</Text>
                        {games.games.map((game, index) => (
                            <TouchableOpacity key={game.id || index} style={styles.gameContainer} onPress = {join(game.id)}>
                                <Text>ID : {game.id}</Text>
                                <Text>Status : {game.status}</Text>
                                <Text>Players : {game.player1Id}   VS    {game.player2Id}</Text>

                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <Button title="Create game" onPress={createGame}/>
            </View>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gamesContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    gameContainer: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default HomeScreen;
