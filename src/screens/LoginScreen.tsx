import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { STUDENT, examStamp } from '@constants/student';
import { theme } from '@constants/theme';
import { Watermark } from '@components/Watermark';
import { useAuthStore } from '@stores/authStore';

export default function LoginScreen() {
    const [phone, setPhone] = useState('0987654321');
    const login = useAuthStore((state) => state.login);

    const handleLogin = () => {
        login(examStamp());
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>KTXGO</Text>
                <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

                <View style={styles.inputBox}>
                    <Text style={styles.label}>(A) Số điện thoại</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder={`Phone — ${STUDENT.mssv}`}
                        keyboardType="phone-pad"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Vào cửa hàng</Text>
                </TouchableOpacity>

                <Text style={styles.hint}>Auth Stack · chưa có token</Text>
            </View>
            <Watermark />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    title: { fontSize: 36, fontWeight: '900', color: theme.primary, letterSpacing: 1 },
    subtitle: { fontSize: 15, color: theme.textLight, marginTop: 4, marginBottom: 36 },
    inputBox: { width: '100%', backgroundColor: theme.surface, borderRadius: 12, borderWidth: 1.5, borderColor: theme.border, padding: 14, marginBottom: 20 },
    label: { fontSize: 12, color: theme.primary, fontWeight: '700', alignSelf: 'flex-end', marginBottom: 4 },
    input: { fontSize: 16, color: theme.text, paddingVertical: 4 },
    button: { width: '100%', backgroundColor: theme.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 16 },
    buttonText: { color: theme.surface, fontSize: 17, fontWeight: '700' },
    hint: { fontSize: 13, color: theme.textLight },
});