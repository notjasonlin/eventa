import 'react-native-url-polyfill/auto'
// import { AuthProvider } from '../store/auth';
import { Provider } from "react-redux";
import { Slot } from 'expo-router';
import { store } from "../store/redux/store";
import AuthHandler from "../components/AuthHandler";

const RootLayout = () => {



  return (
    // <AuthProvider>
    <Provider store={store}>
      <AuthHandler>
        <Slot />
      </ AuthHandler>
    </Provider >
    // </AuthProvider>
  );

};

export default RootLayout;
