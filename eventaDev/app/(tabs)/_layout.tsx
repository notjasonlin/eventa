import { Tabs } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <NavButton 
              messageDestination="(messages)/1" 
              profileDestination="(profile)/Account"
            />
          ),
          tabBarIcon: () => <AntDesign name="home" size={23} color="black" />
        }}
      />
      <Tabs.Screen
        name="checklist/[checklistid]"
        options={{
          headerTitle: "Checklist",
          title: "Checklist",
          headerRight: () => (
            <NavButton 
              messageDestination="(messages)/1" 
              profileDestination="(profile)/Account"
            />
          ),
          tabBarIcon: () => <Octicons name="checklist" size={20} color="black" />
        }}
      />
      <Tabs.Screen
        name="event/[eventid]"
        options={{
          headerTitle: "Event Page",
          title: "Events",
          headerRight: () => (
            <NavButton 
              messageDestination="(messages)/1" 
              profileDestination="(profile)/Account"
            />
          ),
          tabBarIcon: () => <Octicons name="diff-added" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="budget/[budgetid]"
        options={{
          headerTitle: "Smart Budget",
          title: "Budget",
          headerRight: () => (
            <NavButton 
              messageDestination="(messages)/1" 
              profileDestination="(profile)/Account"
            />
          ),
          tabBarIcon: () => <Ionicons name="calculator-outline" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="vendors/fetchVendor"
        options={{
          headerTitle: "Vendor Marketplace", // Change into vendor name in the future
          title: "Vendor",
          headerRight: () => (
            <NavButton 
              messageDestination="(messages)/1" 
              profileDestination="(profile)/Account"
            />
          ),
          tabBarIcon: () => <Ionicons name="storefront-outline" size={24} color="black" />
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
