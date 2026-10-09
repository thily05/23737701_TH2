import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Watermark } from '@components/Watermark';
import { STUDENT, ROOM_LABEL } from '@constants/student';
import { theme } from '@constants/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ShopStackParamList } from '@navigation/ShopStack';

interface Props {
    navigation: NativeStackNavigationProp<ShopStackParamList, 'Home'>;
}

export default function HomeScreen({ navigation }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
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
                />
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.demoCard}
                    onPress={() => navigation.navigate('Detail', { id: '1' })}
                >
                    <Text style={styles.demoText}>Nhấn để xem Chi tiết món demo (Stack Card)</Text>
                </TouchableOpacity>
            </View>

            <Watermark />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    header: { backgroundColor: theme.primary, padding: 16 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { fontSize: 24, fontWeight: '900', color: theme.surface },
    headerTag: { color: '#BFDBFE', fontSize: 13, fontWeight: '700' },
    headerSubtitle: { fontSize: 13, color: '#DBEAFE', marginTop: 2 },
    searchBox: { paddingHorizontal: 16, paddingTop: 12 },
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
    content: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
    demoCard: { backgroundColor: theme.surface, padding: 20, borderRadius: 12, borderWidth: 1, borderColor: theme.border },
    demoText: { color: theme.primary, fontWeight: '700' },
});