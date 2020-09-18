import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Axios from "axios";
import Message from "./pages/message";
import NativeRouter from "react-router-native/NativeRouter";


export default function App() {
  const [locationData, setLocationData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [text,setText] = useState("En attente de géolocalisation ...");
  const [textMsg, setTextMsg] = useState(null)

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Autorisation de géolocalisation refusée');
      } else {
        const location = await Location.getCurrentPositionAsync({});
        setLocationData(location);
      }
    })();
  },[]);

  useEffect(()=> {
    if (errorMsg) {
      setText(errorMsg);
    } else if (locationData) {
      loadCityData()
      displayMsg()
      //setTextMsg(Message())
    }
  },[locationData,errorMsg]);

  function loadCityData() {
    Axios.get("https://geo.api.gouv.fr/communes?lat="+locationData.coords.latitude+"&lon="+locationData.coords.longitude)
        .then(function (response) {
          setText("Vous êtes localisé dans la ville : "+response.data[0].nom)
        })
  }

  function displayMsg() {
    console.log(Message())
    /*if (textMsg) {
      return <Text>{Message().map.result.message}</Text>
    }*/
  }

  return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
