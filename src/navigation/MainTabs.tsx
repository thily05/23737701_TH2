import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from '@navigation/ShopStack';
import CartScreen from '@screens/CartScreen';
import MeScreen from '@screens/MeScreen';
import { useCartStore } from '@stores/cartStore';
import { theme } from '@constants/theme';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    const totalQty = useCartStore((state) => state.getTotalQuantity());

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.textLight,
            }}
        >
            <Tab.Screen name="Cửa hàng" component={ShopStack} />
            <Tab.Screen
                name="Giỏ"
                component={CartScreen}
                options={{
                    tabBarBadge: totalQty > 0 ? totalQty : undefined,
                    tabBarBadgeStyle: { backgroundColor: theme.secondary },
                }}
            />
            <Tab.Screen name="Tôi" component={MeScreen} />
        </Tab.Navigator>
    );
}