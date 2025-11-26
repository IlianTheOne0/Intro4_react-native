import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {MaterialIcons} from "@expo/vector-icons"

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Маршрути',
          tabBarIcon: ({ color, size }) => <MaterialIcons size={size} name="route" color={color} />,
        }}
      />

      <Tabs.Screen
        name="warehouse"
        options={{
          title: 'Склад',
          tabBarIcon: ({ color, size }) => <MaterialIcons size={size} name="inventory" color={color} />,
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: 'Профіль',
          tabBarIcon: ({ color, size }) => <MaterialIcons size={size} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}