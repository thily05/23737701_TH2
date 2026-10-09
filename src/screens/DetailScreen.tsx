import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar, Image } from 'react-native';
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

    // Lấy màu an toàn, đảm bảo luôn có mã màu hợp lệ không bao giờ bị undefined
    const bgColor = theme?.background || '#EFF6FF';
    const primaryColor = theme?.primary || '#1D4ED8';

    const handleAddToCart = () => {
        if (!product) return;

        addItem(product);
        Alert.alert(STUDENT.mssv, `Đã thêm "${product.title}" vào giỏ hàng!`);
    };

    const finalPrice = product ? Math.round(product.price * PRICE_MULTIPLIER) : 0;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
                    <Text style={[styles.backText, { color: primaryColor }]}>← Chi tiết món</Text>
                </TouchableOpacity>
                <Text style={styles.stackLabel}>Stack (Card)</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.imageCard}>
                    {product?.image ? (
                        <Image
                            source={{ uri: product.image }}
                            style={styles.detailImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={[styles.placeholder, { backgroundColor: primaryColor }]} />
                    )}
                </View>

                <Text style={styles.name} numberOfLines={2}>
                    {product?.title || `Món #${id}`}
                </Text>
                <Text style={[styles.price, { color: primaryColor }]}>
                    {finalPrice.toLocaleString('vi-VN')} đ
                </Text>
                <Text style={styles.subtext}>Giao nội khu · nhận tận phòng ký túc xá</Text>

                <Text style={styles.desc} numberOfLines={3}>
                    {product?.description || 'Mô tả ngắn món ăn từ API (tối đa 3 dòng theo đề bài). Dữ liệu được truyền chính xác theo id từ route.params.'}
                </Text>

                <TouchableOpacity
                    style={[styles.addBtn, { backgroundColor: primaryColor }]}
                    onPress={handleAddToCart}
                    activeOpacity={0.85}
                >
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#BFDBFE',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    backText: {
        fontSize: 16,
        fontWeight: '700',
    },
    stackLabel: {
        fontSize: 13,
        color: '#F97316',
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
        height: 190,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#BFDBFE',
        padding: 10,
    },
    detailImage: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        width: '65%',
        height: 100,
        borderRadius: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1E3A8A',
        textAlign: 'center',
        marginBottom: 6,
    },
    price: {
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 4,
    },
    subtext: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 14,
    },
    desc: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 28,
    },
    addBtn: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },
    addBtnText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
    },
});