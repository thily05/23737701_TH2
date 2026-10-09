import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore, CartItem } from '@stores/cartStore';
import { Watermark } from '@components/Watermark';
import { ROOM_LABEL, BASE_SHIP_FEE } from '@constants/student';
import { theme } from '@constants/theme';

export default function CartScreen() {
    const items = useCartStore((state) => state.items);
    const changeQty = useCartStore((state) => state.changeQty);
    const removeItem = useCartStore((state) => state.removeItem);
    const totalAmount = useCartStore((state) => state.totalAmount());

    // Phí ship theo công thức B: BASE_SHIP_FEE + Math.round(km * 1500) + 2000
    const defaultKm = 1.2;
    const shipFee = items.length > 0
        ? BASE_SHIP_FEE + Math.round(defaultKm * 1500) + 2000
        : 0;

    const finalTotal = totalAmount + shipFee;

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item: CartItem) => String(item.id)}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
                        <Text style={styles.emptySubtext}>Hãy chọn món từ Cửa hàng để thêm vào đây</Text>
                    </View>
                }
                renderItem={({ item }: { item: CartItem }) => (
                    <View style={styles.itemCard}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.itemPrice}>
                                {item.price.toLocaleString('vi-VN')} đ
                            </Text>
                        </View>

                        <View style={styles.qtyControls}>
                            <TouchableOpacity
                                style={styles.qtyBtn}
                                onPress={() => changeQty(item.id, item.qty - 1)}
                            >
                                <Text style={styles.qtyBtnText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.qtyValue}>{item.qty}</Text>
                            <TouchableOpacity
                                style={styles.qtyBtn}
                                onPress={() => changeQty(item.id, item.qty + 1)}
                            >
                                <Text style={styles.qtyBtnText}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => removeItem(item.id)}
                        >
                            <Text style={styles.deleteText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {items.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.shipCard}>
                        <Text style={styles.roomText}>Giao đến: {ROOM_LABEL}</Text>
                        <Text style={styles.shipFeeText}>
                            Phí ship: {shipFee.toLocaleString('vi-VN')} đ (Công thức B)
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tiền món:</Text>
                        <Text style={styles.summaryValue}>{totalAmount.toLocaleString('vi-VN')} đ</Text>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                        <Text style={styles.totalValue}>{finalTotal.toLocaleString('vi-VN')} đ</Text>
                    </View>
                </View>
            )}

            <Watermark />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.primary,
    },
    header: {
        backgroundColor: theme.primary,
        paddingVertical: 14,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.surface,
    },
    list: {
        padding: 16,
        flexGrow: 1,
        backgroundColor: theme.background,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.textLight,
    },
    emptySubtext: {
        fontSize: 14,
        color: theme.textLight,
        marginTop: 6,
    },
    itemCard: {
        flexDirection: 'row',
        backgroundColor: theme.surface,
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.border,
        alignItems: 'center',
    },
    itemInfo: {
        flex: 1,
        marginRight: 8,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.text,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '800',
        color: theme.primary,
        marginTop: 4,
    },
    qtyControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    qtyBtn: {
        backgroundColor: '#DBEAFE',
        width: 28,
        height: 28,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyBtnText: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '900',
    },
    qtyValue: {
        marginHorizontal: 10,
        fontSize: 15,
        fontWeight: '700',
        color: theme.text,
    },
    deleteBtn: {
        backgroundColor: '#FEE2E2',
        width: 30,
        height: 30,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        color: theme.error,
        fontSize: 14,
        fontWeight: '900',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.surface,
    },
    shipCard: {
        borderWidth: 1.5,
        borderColor: theme.secondary,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFF7ED',
    },
    roomText: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.text,
    },
    shipFeeText: {
        fontSize: 13,
        fontWeight: '700',
        color: theme.secondary,
        marginTop: 2,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 14,
        color: theme.textLight,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.text,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '800',
        color: theme.text,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.primary,
    },
});