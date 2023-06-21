import * as React from "react";
import Navigation from "./src/navigator/navigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { useFonts } from 'expo-font';

function App() {
  const [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
