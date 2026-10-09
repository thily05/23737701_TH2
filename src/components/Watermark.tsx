import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT, examStamp } from '@constants/student';
import { theme } from '@constants/theme';

export const Watermark = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DBEAFE',
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: theme.border,
    },
    text: {
        fontSize: 12,
        fontWeight: '700',
        color: theme.primary,
    },
});