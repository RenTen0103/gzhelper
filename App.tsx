import { Text } from "native-base";
import React from "react";
import AppContainer from "./src/componets/app-container";
import MainScreen from "./src/screens/main-screen";

const App = () => {
  return (
    <AppContainer>
      <MainScreen></MainScreen>
    </AppContainer>
  );
};

export default App;
