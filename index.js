import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import App from "./App";

// Wrapper component: membungkus seluruh aplikasi dengan SafeAreaProvider
const RootApp = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

// Mendaftarkan komponen utama ke Expo
registerRootComponent(RootApp);