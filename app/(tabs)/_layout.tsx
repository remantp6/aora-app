import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View, ImageSourcePropType } from "react-native";
import icons from "@/constants/icons";

interface TabIconProps {
  name: string;
  color: string;
  icon: ImageSourcePropType;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, icon, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        tintColor={color}
        style={{ width: 24, height: 24, resizeMode: "contain" }}
      />
      <Text
        className='text-xs font-semibold'
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          borderTopWidth: 2,
          backgroundColor: "#161622",
          borderTopColor: "#232533",
          height: 88,
          paddingTop: 14,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "HOME",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              name="Home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="create"
        options={{
          title: "CREATE",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.create}
              name="Create"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "BOOKMARK",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              name="Bookmark"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "PROFILE",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              name="Profile"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
