import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-web';
import {auth} from '../firebase'
import { Audio } from 'expo-av';
import LoginPage from './LoginPage';

const HomePage = () => {

  const navigation=useNavigation();

const signOut =async()=>{
  auth
  .signOut()
  .then(()=>console.log('user signed out'))
  navigation.push('LoginPage')
}
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState([]);

  async function startRecording(){
    try{
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted'){
        await Audio.setAudioModeAsync({
          allowsRecordingIOS:true,
          playsInSilentModeIOS:true,
        });

        const {recording} = await Audio.Recording.createAsync(
          Audio.RECODING_OPTIONS_PRESET_HIGH_QUALITY
        );
          setRecording(recording);
      }else{
        setMessage("Please grant per to app to access microphone");
      }
    }catch (err){
      console.error('fail to start recording',err);
    }
  }
  async function stopRecording(){
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings=[...recordings];
    const{sound, status} = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound:sound,
      duration:getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });
    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(milles){
    const minutes = milles / 1000 / 60;
    const minutesDisplay =Math.floor(minutes);
    const seconds = Math.round((minutes-minutesDisplay)*60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }
  function getRecordingLines(){
    return recordings.map((recordingLine, index)=>{
      return(
        <View key={index} style={styles.line}>
          <Text style={styles.fill}>Recording{index + 1}-{recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      )
    })
  }
  return(
    <View style={styles.container}>
      <Button 
      title={recording ? 'Stop Recording': 'Start Recording'}
      onPress = {recording ? stopRecording : startRecording}/>
      {getRecordingLines()}
      <StatusBar style="auto"/>

      <TouchableOpacity
                onPress={signOut}
                style={styles.button2}
            >
                <Text style={styles.buttonText}>LogOut</Text>
            </TouchableOpacity>

    </View>
    
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  },

  button2:{
    backgroundColor:'#4663ac',
    width:'40%',
    padding:15,
    borderRadius:10,
    marginTop:35,
 },

 buttonText:{
  justifyContent:'center',
  alignSelf:'center'

 }
});

 

export default HomePage

