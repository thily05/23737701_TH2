import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ShopStackParamList } from '@navigation/ShopStack';
import { fetchProducts, Product } from '@services/productApi';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';
import { useCartStore } from '@stores/cartStore';
import { STUDENT, DEBOUNCE_MS, STALE_TIME_MS, ROOM_LABEL } from '@constants/student';
import { theme } from '@constants/theme';

interface Props {
    navigation: NativeStackNavigationProp<ShopStackParamList, 'Home'>;
}

export default function HomeScreen({ navigation }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    // Sử dụng giá trị debounce theo hằng số DEBOUNCE_MS của sinh viên
    const debouncedSearch = useDebouncedValue(searchTerm, DEBOUNCE_MS);
    const addToCart = useCartStore((state) => state.addToCart);

    // TanStack Query gọi API
    const { data, isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: STALE_TIME_MS,
    });

    // Lọc dữ liệu theo chuỗi đã debounce
    const filteredData = (data || []).filter((item) =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const handleAdd = (item: Product) => {
        try {
            Haptics.selectionAsync(); // Hiệu ứng Haptic selection đúng số cuối 1
        } catch {
            // Bỏ qua nếu môi trường máy ảo chưa liên kết rung
        }
        addToCart({
            id: item.id,
            title: item.title,
            price: Math.round(item.price * (15000 + (701 % 40) * 500)),
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header chuẩn KTXGO + (A) + ROOM_LABEL */}
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>KTXGO</Text>
                    <Text style={styles.headerTag}>(A)</Text>
                </View>
                <Text style={styles.headerSubtitle}>Giao tận {ROOM_LABEL}</Text>
            </View>

            {/* Ô tìm kiếm controlled (B) */}
            <View style={styles.searchBox}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholderTextColor={theme.textLight}
                />
            </View>

            {/* Nhãn FlashList x2 (C) */}
            <View style={styles.subBar}>
                <Text style={styles.subBarText}>(C) FlashList x2</Text>
            </View>

            {/* Khu vực nội dung: Xử lý đủ 3 cảnh mạng */}
            <View style={styles.content}>
                {isLoading ? (
                    // Cảnh mạng 1: Đang tải
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={theme.primary} />
                        <Text style={styles.loadingText}>Đang tải món...</Text>
                    </View>
                ) : isError ? (
                    // Cảnh mạng 3: Lỗi mạng (Hiển thị MSSV đỏ + Thử lại)
                    <View style={styles.center}>
                        <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
                        <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
                        <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
                            <Text style={styles.retryText}>Thử lại</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Cảnh mạng 2: Có dữ liệu (Lưới FlashList 2 cột)
                    <FlashList
                        data={filteredData}
                        renderItem={({ item }) => (
                            <ProductCard
                                product={item}
                                onPress={() => navigation.navigate('Detail', { id: String(item.id) })}
                                onAdd={() => handleAdd(item)}
                            />
                        )}
                        numColumns={2}
                        keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
                        refreshing={isRefetching}
                        onRefresh={refetch}
                    />
                )}
            </View>

            {/* Watermark cố định ở mép Dưới */}
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
        backgroundColor: theme.primary,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: theme.surface,
        letterSpacing: 0.5,
    },
    headerTag: {
        color: '#BFDBFE',
        fontSize: 13,
        fontWeight: '700',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#DBEAFE',
        marginTop: 2,
    },
    searchBox: {
        paddingHorizontal: 12,
        paddingTop: 10,
    },
    searchInput: {
        backgroundColor: theme.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.border,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        color: theme.text,
    },
    subBar: {
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    subBarText: {
        fontSize: 12,
        color: theme.primary,
        fontWeight: '700',
    },
    content: {
        flex: 1,
        paddingHorizontal: 6,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 15,
        color: theme.textLight,
    },
    errorMssv: {
        fontSize: 20,
        fontWeight: '900',
        color: theme.error,
        marginBottom: 6,
    },
    errorText: {
        fontSize: 14,
        color: theme.textLight,
        marginBottom: 16,
    },
    retryBtn: {
        backgroundColor: theme.error,
        paddingHorizontal: 26,
        paddingVertical: 12,
        borderRadius: 10,
    },
    retryText: {
        color: theme.surface,
        fontWeight: '800',
        fontSize: 15,
    },
});