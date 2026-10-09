import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Product } from '@services/productApi';
import { PRICE_MULTIPLIER } from '@constants/student';
import { theme } from '@constants/theme';

interface Props {
    product: Product;
    onPress: () => void;
    onAdd: () => void;
}

export const ProductCard: React.FC<Props> = ({ product, onPress, onAdd }) => {
    const finalPrice = Math.round(product.price * PRICE_MULTIPLIER);

    return (
        <View style={styles.card}>
            {/* Vùng bấm xem chi tiết */}
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.infoArea}>
                <View style={styles.imageBox}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>

                <Text style={styles.price}>
                    {finalPrice.toLocaleString('vi-VN')} đ
                </Text>
            </TouchableOpacity>

            {/* Nút bấm thêm vào giỏ độc lập */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={onAdd}
                activeOpacity={0.7}
            >
                <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
        </View>
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
    infoArea: {
        flex: 1,
    },
    imageBox: {
        height: 100,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        padding: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
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