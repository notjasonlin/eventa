import 'react-native-url-polyfill/auto'
import { AuthProvider } from '../context/auth';
import { Slot } from 'expo-router';

const RootLayout = () => {

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
  
};

export default RootLayout;
