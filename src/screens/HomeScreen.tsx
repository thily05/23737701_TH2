import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
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
    const debouncedSearch = useDebouncedValue(searchTerm, DEBOUNCE_MS);
    const addItem = useCartStore((state) => state.addItem);

    const { data, isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: STALE_TIME_MS,
    });

    const filteredData = (data || []).filter((item) =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const handleAdd = (item: Product) => {
        addItem(item);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>KTXGO</Text>
                    <Text style={styles.headerTag}>(A)</Text>
                </View>
                <Text style={styles.headerSubtitle}>Giao tận {ROOM_LABEL}</Text>
            </View>

            <View style={styles.searchBox}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholderTextColor={theme.textLight}
                />
            </View>

            <View style={styles.subBar}>
                <Text style={styles.subBarText}>(C) FlashList x2</Text>
            </View>

            <View style={styles.content}>
                {isLoading ? (
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={theme.primary} />
                        <Text style={styles.loadingText}>Đang tải món...</Text>
                    </View>
                ) : isError ? (
                    <View style={styles.center}>
                        <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
                        <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
                        <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
                            <Text style={styles.retryText}>Thử lại</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
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
        paddingHorizontal: 16,
        paddingBottom: 14,
        paddingTop: 6,
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
        backgroundColor: theme.background,
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
        backgroundColor: theme.background,
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
        backgroundColor: theme.background,
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