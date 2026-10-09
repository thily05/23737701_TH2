import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Vibration, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShopStackParamList } from '@navigation/ShopStack';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import { Watermark } from '@components/Watermark';
import { STUDENT, PRICE_MULTIPLIER } from '@constants/student';
import { theme } from '@constants/theme';

type Props = NativeStackScreenProps<ShopStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
    const { id } = route.params;
    const { data } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
    const product = data?.find((p) => String(p.id) === id);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        if (product) {
            try {
                const Haptics = require('expo-haptics');
                Haptics.selectionAsync?.();
            } catch {
                Vibration.vibrate(40);
            }

            addItem(product);
            Alert.alert(STUDENT.mssv, `Đã thêm "${product.title}" vào giỏ hàng!`);
        }
    };

    const finalPrice = product ? Math.round(product.price * PRICE_MULTIPLIER) : 0;

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Chi tiết món</Text>
                </TouchableOpacity>
                <Text style={styles.stackLabel}>Stack (Card)</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.imageCard}>
                    <View style={styles.imageBox} />
                </View>

                <Text style={styles.name} numberOfLines={2}>
                    {product?.title || `Món #${id}`}
                </Text>
                <Text style={styles.price}>{finalPrice.toLocaleString('vi-VN')} đ</Text>
                <Text style={styles.subtext}>Giao nội khu · nhận tận phòng ký túc xá</Text>

                <Text style={styles.desc} numberOfLines={3}>
                    {product?.description || 'Mô tả ngắn món ăn từ API (tối đa 3 dòng theo đề bài). Dữ liệu được truyền chính xác theo id từ route.params.'}
                </Text>

                <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
                    <Text style={styles.addBtnText}>Thêm vào giỏ · Haptic</Text>
                </TouchableOpacity>
            </View>

            <Watermark />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: theme.border,
        alignItems: 'center',
    },
    backText: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.primary,
    },
    stackLabel: {
        fontSize: 13,
        color: theme.secondary,
        fontWeight: '700',
    },
    body: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCard: {
        width: '100%',
        height: 180,
        backgroundColor: '#FEF3C7',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: theme.border,
    },
    imageBox: {
        width: '65%',
        height: 100,
        backgroundColor: theme.primary,
        borderRadius: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.text,
        textAlign: 'center',
        marginBottom: 6,
    },
    price: {
        fontSize: 22,
        fontWeight: '900',
        color: theme.primary,
        marginBottom: 4,
    },
    subtext: {
        fontSize: 13,
        color: theme.textLight,
        marginBottom: 14,
    },
    desc: {
        fontSize: 14,
        color: theme.textLight,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 28,
    },
    addBtn: {
        backgroundColor: theme.primary,
        width: '100%',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },
    addBtnText: {
        color: theme.surface,
        fontSize: 17,
        fontWeight: '800',
    },
});