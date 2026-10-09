import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Watermark } from '@components/Watermark';
import { ROOM_LABEL } from '@constants/student';
import { theme } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

export default function CartScreen() {
    const totalAmount = useCartStore((state) => state.getTotalAmount());

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.shipCard}>
                    <Text style={styles.roomText}>Giao đến {ROOM_LABEL}</Text>
                    <Text style={styles.shipFeeText}>Phí ship: 12.000 đ (công thức B)</Text>
                </View>

                <Text style={styles.totalText}>
                    Tổng hàng: {totalAmount.toLocaleString('vi-VN')} đ
                </Text>
            </View>

            <Watermark />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    header: { backgroundColor: theme.primary, padding: 16, alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '900', color: theme.surface },
    body: { flex: 1, padding: 16, justifyContent: 'center' },
    shipCard: { borderWidth: 1.5, borderColor: theme.secondary, borderRadius: 10, padding: 14, marginBottom: 16 },
    roomText: { fontSize: 15, fontWeight: '700', color: theme.text },
    shipFeeText: { fontSize: 14, fontWeight: '700', color: theme.secondary, marginTop: 4 },
    totalText: { fontSize: 20, fontWeight: '900', color: theme.primary, textAlign: 'center' },
});