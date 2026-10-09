import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShopStackParamList } from '@navigation/ShopStack';
import { Watermark } from '@components/Watermark';
import { STUDENT } from '@constants/student';
import { theme } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

type Props = NativeStackScreenProps<ShopStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
    const { id } = route.params;
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAdd = () => {
        addToCart({ id: Number(id), title: `Món mẫu #${id}`, price: 25000 });
        Alert.alert(STUDENT.mssv, 'Đã thêm vào giỏ hàng thành công!');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Chi tiết món</Text>
                </TouchableOpacity>
                <Text style={styles.stackLabel}>Stack</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Chi tiết món #{id}</Text>
                <Text style={styles.subtext}>Mô tả ngắn từ API (tối đa 3 dòng).</Text>
                <Text style={styles.subtext}>Giữ nguyên id từ route.params: {id}</Text>

                <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                    <Text style={styles.addBtnText}>Thêm vào giỏ · Haptic</Text>
                </TouchableOpacity>
            </View>

            <Watermark />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: theme.border },
    backText: { fontSize: 16, fontWeight: '700', color: theme.primary },
    stackLabel: { fontSize: 13, color: theme.secondary, fontWeight: '700' },
    body: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: '900', color: theme.text, marginBottom: 8 },
    subtext: { fontSize: 14, color: theme.textLight, marginBottom: 8 },
    addBtn: { backgroundColor: theme.primary, width: '100%', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 24 },
    addBtnText: { color: theme.surface, fontSize: 17, fontWeight: '800' },
});