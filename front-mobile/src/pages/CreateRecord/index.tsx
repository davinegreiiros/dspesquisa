import React, { useState, useEffect } from 'react';
import { FontAwesome5 as Icon} from '@expo/vector-icons';
import { StyleSheet, View, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

import Header from '../../components/Header';
import PlatformCard from './PlartformCard';
import { GamePlatform, Game } from './types';

const placeholder= {
  label: "Selecione o Game",
  value: null
}

const BASE_URL = 'http://192.168.15.55:8080';


const mapSelectValues = (games: Game[]) =>{
  return games.map(game => ({
    ...game,
    label: game.title,
    value:game.id
  }));
}

const CreateRecord = () => {
  
  const [platform, setPlatform] = useState<GamePlatform>();
  const [selectedGame, setSelectedGame]  = useState('');
  const [allGames, setAllGames] = useState<Game[]>([]);

  const handleChangePlatform = (selectedPlatform: GamePlatform ) =>{
     setPlatform(selectedPlatform);
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/games`).
    then(response =>{
      const selectValues = mapSelectValues(response.data);
      console.log(selectValues)
      setAllGames(selectValues);
    }) 
  }, [])

    return(
        <>
        <Header/>
        <View style={styles.container}>
          <TextInput 
          style={styles.inputText}
          placeholder="Nome"
          placeholderTextColor="#9E9E9E"
          />
          <TextInput 
          keyboardType="numeric"
          style={styles.inputText}
          placeholder="Idade"
          placeholderTextColor="#9E9E9E"
          maxLength={2}
          />
          <View style={styles.platformContainer}>
            <PlatformCard 
            platform="PC"
            icon="laptop"
            onChange={handleChangePlatform}
            activePlatform={platform}
            />
            <PlatformCard 
            platform="XBOX"
            icon="xbox"
            onChange={handleChangePlatform}
            activePlatform={platform}
            />
            <PlatformCard 
            platform="PLAYSTATION"
            icon="playstation"
            onChange={handleChangePlatform}
            activePlatform={platform}
            />
        </View> 
          <RNPickerSelect 
          onValueChange={value =>{
            setSelectedGame(value);
          }}
          placeholder={placeholder}
          items={allGames}
          style={pickerSelectStyles}
          Icon={() => {
            return <Icon name="chevron-down" c olor="#9E9E9E" size={25} />
          }}
          />
        </View>
        </>
    )
};


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: "Play_700Bold",
  },
  iconContainer: {
    top: 10,
    right: 12,
  }
});

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: 50
  },
  inputText: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    fontFamily: "Play_700Bold",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 21
  },
  platformContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: '15%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00D4FF',
    flexDirection: 'row',
    borderRadius: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: "Play_700Bold",
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0B1F34',
  }
});
export default CreateRecord;