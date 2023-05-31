import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  PermissionsAndroid,
  Alert,
  Dimensions,
  BackHandler,
  Linking,
} from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import { navigationRef } from "./rootNavigation";
import Colors from "../helpers/Colors";

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

function AppNavigator(props) {
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle:{backgroundColor:'#303F9F'},
            headerTitleAlign: "center",
            headerShown: true,
            title: "Blog",
            headerBackTitle: "Geri",
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerBackTitleStyle: {
              color: Colors.primary,
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerStyle:{backgroundColor:'#303F9F'},
            headerTitleAlign: "center",
            headerShown: true,
            title: "Blog Detail",
            headerBackTitle: "Geri",
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerBackTitleStyle: {
              color: Colors.primary,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
