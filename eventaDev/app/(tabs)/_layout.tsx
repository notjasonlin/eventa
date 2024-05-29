// tabs/TabsLayout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import NavButton from '../../components/Buttons/NavButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const TabsLayout: React.FC = () => {
  const renderHeaderRight = () => (
    <View style={styles.headerRightContainer}>
      <NavButton
        destination="(messages)/1"
        icon={<AntDesign name="mail" size={24} color="black" />}
      />
      <NavButton
        destination="(profile)/Account"
        icon={<Feather name="user" size={23} color="black" />}
      />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerRight: renderHeaderRight,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <AntDesign name="home" size={23} color="black" />
        }}
      />
      <Tabs.Screen
        name="checklist/[checklistid]"
        options={{
          headerTitle: "Checklist",
          title: "Checklist",
          tabBarIcon: () => <Octicons name="checklist" size={20} color="black" />
        }}
      />
      <Tabs.Screen
        name="event/[eventid]"
        options={{
          headerTitle: "Event Page",
          title: "Events",
          tabBarIcon: () => <Octicons name="diff-added" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="budget/[budgetid]"
        options={{
          headerTitle: "Smart Budget",
          title: "Budget",
          tabBarIcon: () => <Ionicons name="calculator-outline" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="vendors/fetchVendor"
        options={{
          headerTitle: "Vendor Marketplace", // Change into vendor name in the future
          title: "Vendor",
          tabBarIcon: () => <Ionicons name="storefront-outline" size={24} color="black" />
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
});

export default TabsLayout;
