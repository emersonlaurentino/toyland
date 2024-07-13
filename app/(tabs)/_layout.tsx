import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import theme from "@/constants/theme";
import useBoundStore from "@/store";
import { Redirect, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const token = useBoundStore(useShallow((state) => state.token));
  const user = useBoundStore(useShallow((state) => state.user));
  const fetchUser = useBoundStore((state) => state.fetchUser);
  useEffect(() => {
    if (token) {
      fetchUser("refresh");
    }
  }, [token]);

  if (!token) return <Redirect href="/(auth)/get-started" />;

  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
      }}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 2,
          borderTopColor: theme.colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Grupos",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "compass" : "compass-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notificações",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        listeners={{
          // disable tab press if user is not loaded
          tabPress: (e) => {
            if (!user) {
              e.preventDefault();
            }
          },
        }}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
