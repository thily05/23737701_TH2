import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import DetailScreen from '@screens/DetailScreen';

export type ShopStackParamList = {
    Home: undefined;
    Detail: { id: string };
};

const Stack = createNativeStackNavigator<ShopStackParamList>();

export default function ShopStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{ presentation: 'card' }}
            />
        </Stack.Navigator>
    );
}