import 'react-native-url-polyfill/auto'
import { Provider } from "react-redux";
import { Slot } from 'expo-router';
import { store } from "../store/redux/store";
import AuthHandler from "../components/AuthHandler";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <AuthHandler>
        <Slot />
      </AuthHandler>
    </Provider >
  );

};

export default RootLayout;
