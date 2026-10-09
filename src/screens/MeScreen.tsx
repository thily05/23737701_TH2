import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT, examStamp } from '@constants/student';
import { theme } from '@constants/theme';
import { Watermark } from '@components/Watermark';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { useAuthStore } from '@stores/authStore';

export default function MeScreen() {
    const { permissionStatus, distanceKm, shipFee, requestPermission, openSettings } = useCampusLocation();
    const logout = useAuthStore((state) => state.logout);

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.name}>{STUDENT.hoTen}</Text>
                <Text style={styles.info}>{STUDENT.mssv} · #{examStamp()}</Text>

                <View style={styles.statusBox}>
                    <Text style={styles.statusText}>
                        Quyền vị trí: {' '}
                        <Text style={{
                            color: permissionStatus === 'granted' ? theme.success : theme.error,
                            fontWeight: '900'
                        }}>
                            {permissionStatus}
                        </Text>
                    </Text>

                    {distanceKm !== null && (
                        <Text style={styles.distText}>
                            ≈ {distanceKm} km tới Cổng KTX (Haversine)
                        </Text>
                    )}

                    <Text style={styles.feeLabel}>Phí ship ước tính (Công thức B):</Text>
                    <Text style={styles.feeValue}>
                        {shipFee > 0 ? `${shipFee.toLocaleString('vi-VN')} đ` : 'Chưa lấy vị trí'}
                    </Text>
                </View>

                <TouchableOpacity style={styles.primaryBtn} onPress={requestPermission}>
                    <Text style={styles.btnText}>Lấy vị trí ước tính ship</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.outlineBtn} onPress={openSettings}>
                    <Text style={styles.outlineBtnText}>Mở Cài đặt (blocked)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Text style={styles.logoutBtnText}>Đăng xuất</Text>
                </TouchableOpacity>
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
        paddingVertical: 14,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.surface,
    },
    body: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 24,
        alignItems: 'center',
    },
    name: {
        fontSize: 22,
        fontWeight: '900',
        color: theme.text,
    },
    info: {
        fontSize: 14,
        color: theme.textLight,
        marginTop: 4,
        marginBottom: 24,
    },
    statusBox: {
        width: '100%',
        backgroundColor: theme.surface,
        borderRadius: 14,
        padding: 18,
        borderWidth: 1,
        borderColor: theme.border,
        marginBottom: 20,
    },
    statusText: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.text,
    },
    distText: {
        fontSize: 14,
        color: theme.primary,
        fontWeight: '600',
        marginTop: 8,
    },
    feeLabel: {
        fontSize: 13,
        color: theme.textLight,
        marginTop: 14,
    },
    feeValue: {
        fontSize: 24,
        fontWeight: '900',
        color: theme.secondary,
        marginTop: 4,
    },
    primaryBtn: {
        width: '100%',
        backgroundColor: theme.primary,
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 12,
    },
    btnText: {
        color: theme.surface,
        fontSize: 16,
        fontWeight: '700',
    },
    outlineBtn: {
        width: '100%',
        backgroundColor: theme.surface,
        borderWidth: 1.5,
        borderColor: theme.primary,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 16,
    },
    outlineBtnText: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '700',
    },
    logoutBtn: {
        width: '100%',
        backgroundColor: '#FEE2E2',
        borderWidth: 1,
        borderColor: theme.error,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    logoutBtnText: {
        color: theme.error,
        fontSize: 16,
        fontWeight: '700',
    },
});