import React, { useState, useEffect } from 'react';
import { Text, View,Image, StyleSheet, Alert,Button ,TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { addParticipant } from '../firebase/UserModel';
import { useDispatch,useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode-svg';
import DropShadow from 'react-native-drop-shadow';
import { TimeData } from '../firebase/UserModel';
import LinearGradient from 'react-native-linear-gradient';

import { RNCamera } from 'react-native-camera';


export const ScanScreen =  ({ })=>{
  const user = useSelector((state)=>state.auths);
  const userUID = user[0].uid;
  let timeData = TimeData();
  const [scannedData, setScannedData] = useState([]);
  const profile = firestore().collection('users').doc(userUID).get();



  const handleAddparticipantdata = (participantProfile) => {
    if(participantProfile != null) {
        const eventID = profile._j._data.eventID;

        addParticipant(participantProfile,eventID,timeData);
    }

  }

  const handleBarCodeScanned = ({ data }) => {
    try {
      
      let realdata = caesarDecipher(data, 3);
      console.log(timeData);
      const scannedObject = JSON.parse(data);
      setScannedData(scannedObject);
      Alert.alert('QR Code Scanned',data, [{ text: 'OK', onPress: () => handleAddparticipantdata(scannedData) }]);
    } catch (error) {
      console.error('Error parsing scanned data:', error);
    }
  };

  function caesarCipher(text, key) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        // ตรวจสอบว่าตัวอักษรเป็นตัวพิมพ์ใหญ่หรือตัวพิมพ์เล็ก
        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            // กำหนดระยะที่ต้องการเลื่อนตำแหน่ง
            let shift = key % 26;
            // หาตำแหน่ง ASCII ของตัวอักษรใหม่
            if ((code >= 65) && (code <= 90)) {
                char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else if ((code >= 97) && (code <= 122)) {
                char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
        }
        result += char;
    }

    return result;
}

function caesarDecipher(text, key) {
  return caesarCipher(text, -key);
}

/*   return (
    <View style={styles.container}>
      <QRCodeScanner    
        cameraStyle={styles.camera}
        customMarker={
          <View style={styles.customMarkerContainer}>
            <Image
              source={require('../assets/images/qrscaning.png')}
              style={styles.customMarkerImage}
            />
          </View>
        }
        bottomContent={
          <View style={styles.bottomContentContainer}>
            <Text style={styles.instructionsText}>Scan the QR code</Text>

          </View>
        } 
        onRead={handleBarCodeScanned}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={2000}>     
        </QRCodeScanner>
      {scannedData && console.log("Hey") }
    </View>
  ); 

 */



  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={handleBarCodeScanned}
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      />

      <LinearGradient start={{x: 1, y: 0}} end={{x: 1, y: 3}} colors={['#0D433D', '#7CEBDE']} style={styles.bottomContent}>
        {/* ส่วนของเนื้อหาด้านล่าง */}
        <Text style={{ fontSize: 16, color: 'white',fontFamily:'Prompt-Light' }}>แสกน QR เพื่อลงทะเบียนเด็กเข้างาน</Text>
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomContent: {
    flex:1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#0D433D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex:1
  },
  customMarkerContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  customMarkerImage: {
    width: 280,
    height: 280,

  },
  dropShadow:{
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  elevation: 7,
    }
});

/* const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
}); */