import React from 'react';
import { useAuthStore } from '@stores/authStore';
import AuthStack from '@navigation/AuthStack';
import MainTabs from '@navigation/MainTabs';

export default function RootNavigator() {
  const token = useAuthStore((state) => state.token);
  return token ? <MainTabs /> : <AuthStack />;
}