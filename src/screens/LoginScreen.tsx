import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT } from '@constants/student';
import { Watermark } from '@components/Watermark';
import { useAuthStore } from '@stores/authStore';

export default function LoginScreen() {
    const [phone, setPhone] = useState('');
    const login = useAuthStore((state) => state.login);

    const handleLogin = () => {
        // Validate không rỗng theo yêu cầu đề bài
        if (!phone.trim()) {
            Alert.alert(
                'Thông báo',
                'Vui lòng nhập số điện thoại, không được để trống!'
            );
            return;
        }

        // Hợp lệ -> lưu token giả ktxgo-23737701-{stamp} vào Zustand và vào Main Tabs
        login();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                {/* Tiêu đề & Phụ đề chuẩn theo ảnh mẫu */}
                <Text style={styles.title}>KTXGO</Text>
                <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

                {/* Khung ô nhập: Placeholder MSSV bên trái, nhãn (A) bên phải */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder={`Phone — ${STUDENT.mssv}`}
                        placeholderTextColor="#64748B"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                    />
                    <Text style={styles.inputTag}>(A)</Text>
                </View>

                {/* Nút Vào cửa hàng */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    activeOpacity={0.85}
                >
                    <Text style={styles.buttonText}>Vào cửa hàng</Text>
                </TouchableOpacity>

                {/* Nhãn trạng thái Auth */}
                <Text style={styles.hint}>Auth Stack · chưa có token</Text>
            </View>

            {/* Watermark mép Dưới theo biến thể số cuối 1 */}
            <Watermark />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    title: {
        fontSize: 40,
        fontWeight: '900',
        color: '#2563EB',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#BFDBFE',
        borderRadius: 16,
        height: 56,
        paddingHorizontal: 18,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#0F172A',
        paddingVertical: 0,
    },
    inputTag: {
        fontSize: 14,
        fontWeight: '800',
        color: '#2563EB',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#2563EB',
        borderRadius: 16,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
    hint: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
    },
});