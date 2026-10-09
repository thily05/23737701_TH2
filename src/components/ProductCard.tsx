import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '@services/productApi';
import { PRICE_MULTIPLIER } from '@constants/student';
import { theme } from '@constants/theme';

interface Props {
    product: Product;
    onPress: () => void;
    onAdd: () => void;
}

export const ProductCard: React.FC<Props> = ({ product, onPress, onAdd }) => {
    // Tính giá theo công thức đề bài: Math.round(price * PRICE_MULTIPLIER)
    const finalPrice = Math.round(product.price * PRICE_MULTIPLIER);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            {/* Khung ảnh mockup đồng bộ theo đề */}
            <View style={styles.imagePlaceholder}>
                <View style={styles.imageInner} />
            </View>

            {/* Tên món hiển thị tối đa 2 dòng */}
            <Text style={styles.name} numberOfLines={2}>
                {product.title}
            </Text>

            {/* Giá món theo định dạng vi-VN */}
            <Text style={styles.price}>
                {finalPrice.toLocaleString('vi-VN')} đ
            </Text>

            {/* Nút + thêm giỏ hàng nhanh */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={(e) => {
                    e.stopPropagation(); // Ngăn chặn nhảy vào màn hình Detail
                    onAdd();
                }}
            >
                <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: theme.surface,
        margin: 6,
        borderRadius: 14,
        padding: 12,
        borderWidth: 1,
        borderColor: theme.border,
        justifyContent: 'space-between',
    },
    imagePlaceholder: {
        height: 90,
        backgroundColor: '#FEF3C7',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    imageInner: {
        width: '75%',
        height: 45,
        backgroundColor: theme.primary,
        borderRadius: 6,
    },
    name: {
        fontSize: 13,
        fontWeight: '700',
        color: theme.text,
        height: 36,
    },
    price: {
        fontSize: 14,
        fontWeight: '800',
        color: theme.primary,
        marginTop: 4,
        marginBottom: 6,
    },
    addButton: {
        backgroundColor: theme.primary,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        color: theme.surface,
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 22,
    },
});