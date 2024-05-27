import { Tabs } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import React from "react";


const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>),
          tabBarIcon: () => <AntDesign name="home" size={23} color="black" />
        }}
      />
      <Tabs.Screen
        name="checklist/[checklistid]"
        options={{
          headerTitle: "Checklist",
          title: "Checklist",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>),
          tabBarIcon: () => <Octicons name="checklist" size={20} color="black" />
        }}
      />
      <Tabs.Screen
        name="vendors/fetchVendor"
        options={{
          headerTitle: "Vendor Marketplace", // Change into vendor name in the future
          title: "Vendor",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>),
          tabBarIcon: () => <Ionicons name="storefront-outline" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="budget/[budgetid]"
        options={{
          headerTitle: "Smart Budget",
          title: "Budget",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>),
          tabBarIcon: () => <Ionicons name="calculator-outline" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="users/[id]"
        options={{
          headerTitle: "User Page",
          title: "Profile",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>),
          tabBarIcon: () => <Feather name="user" size={24} color="black" />
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;