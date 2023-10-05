import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {AddGuestDataScreen, PaymentDetailsScreen} from '@pages';
import {GuestData} from '@types';

export type RootStackParamList = {
  PaymentDetails: undefined;
  AddGuestData: GuestData[];
};

export type RootScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type RouteStackProp = RouteProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const routes: Array<React.ComponentProps<typeof Stack.Screen>> = [
  {name: 'PaymentDetails', component: PaymentDetailsScreen},
  {name: 'AddGuestData', component: AddGuestDataScreen},
];

const rootStackNavigatorProps: Omit<React.ComponentProps<typeof Stack.Navigator>, 'children'> = {
  screenOptions: {
    headerShown: false,
    animation: 'none',
  },
};

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator {...rootStackNavigatorProps}>
        {routes.map(routeConfig => (
          <Stack.Screen key={routeConfig.name} {...routeConfig} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
