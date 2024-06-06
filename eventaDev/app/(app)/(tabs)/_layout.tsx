import { View } from "react-native";
import { Tabs } from "expo-router";
import NavButton from "../../../components/Buttons/NavButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const renderHeaderRight = () => (
  <View style={{ flexDirection: "row", marginLeft: 10 }}>
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

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: renderHeaderRight,
          tabBarIcon: () => <AntDesign name="home" size={23} color="black" />
        }}
      />
      <Tabs.Screen
        name="checklist/[checklistid]"
        options={{
          headerTitle: "Checklist",
          title: "Checklist",
          headerRight: renderHeaderRight,
          tabBarIcon: () => <Octicons name="checklist" size={20} color="black" />
        }}
      />
      <Tabs.Screen
        name="event/eventList"
        options={{
          headerTitle: "Event Page",
          title: "Events",
          headerRight: renderHeaderRight,
          tabBarIcon: () => <Octicons name="diff-added" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="budget/[budgetid]"
        options={{
          headerTitle: "Smart Budget",
          title: "Budget",
          headerRight: renderHeaderRight,
          tabBarIcon: () => <Ionicons name="calculator-outline" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="vendors/vendorTypes"
        options={{
          headerTitle: "Vendor Marketplace", // Change into vendor name in the future
          title: "Vendor",
          headerRight: renderHeaderRight,
          tabBarIcon: () => <Ionicons name="storefront-outline" size={24} color="black" />
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
