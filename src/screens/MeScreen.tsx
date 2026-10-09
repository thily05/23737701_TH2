import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { STUDENT, examStamp } from '@constants/student';
import { theme } from '@constants/theme';
import { Watermark } from '@components/Watermark';
import { useAuthStore } from '@stores/authStore';

export default function MeScreen() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.name}>{STUDENT.hoTen}</Text>
                <Text style={styles.info}>{STUDENT.mssv} · #{examStamp()}</Text>

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Text style={styles.btnText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

            <Watermark />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    header: { backgroundColor: theme.primary, padding: 16, alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '900', color: theme.surface },
    body: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
    name: { fontSize: 22, fontWeight: '900', color: theme.text },
    info: { fontSize: 14, color: theme.textLight, marginTop: 4, marginBottom: 32 },
    logoutBtn: { width: '100%', backgroundColor: theme.error, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
    btnText: { color: theme.surface, fontSize: 16, fontWeight: '700' },
});