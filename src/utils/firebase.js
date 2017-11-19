import { initializeApp } from 'firebase';
import config from './config';
import DeviceInfo from 'react-native-device-info';

const firebaseApp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
});
export const recordsRef = firebaseApp.database().ref(DeviceInfo.getUniqueID()+'/');

export default firebaseApp;