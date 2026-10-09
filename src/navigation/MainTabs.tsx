import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from '@navigation/ShopStack';
import CartScreen from '@screens/CartScreen';
import MeScreen from '@screens/MeScreen';
import { useCartStore } from '@stores/cartStore';
import { theme } from '@constants/theme';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    const totalQty = useCartStore((state) => state.totalQuantity());

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.textLight,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 6,
                    paddingTop: 6,
                    backgroundColor: theme.surface,
                    borderTopWidth: 1,
                    borderTopColor: theme.border,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '700',
                },
            }}
        >
            <Tab.Screen
                name="Cửa hàng"
                component={ShopStack}
                options={{
                    tabBarIcon: () => (
                        <Text style={styles.tabIcon}>🏪</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Giỏ"
                component={CartScreen}
                options={{
                    tabBarBadge: totalQty > 0 ? totalQty : undefined,
                    tabBarBadgeStyle: { backgroundColor: theme.secondary },
                    tabBarIcon: () => (
                        <Text style={styles.tabIcon}>🛒</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Tôi"
                component={MeScreen}
                options={{
                    tabBarIcon: () => (
                        <Text style={styles.tabIcon}>👤</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabIcon: {
        fontSize: 20,
    },
});