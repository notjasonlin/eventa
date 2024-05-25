import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="users/[id]"
        options={{
          headerTitle: "User Page",
          title: "User",
        }}
      />
      <Tabs.Screen
        name="vendors/[vendorid]"
        options={{
          headerTitle: "Vendor", // Change into vendor name in the future
          title: "Vendor",
        }}
      />
      <Tabs.Screen
        name="budget/[budgetid]"
        options={{
          headerTitle: "Smart Budget",
          title: "Budget",
        }}
      />
      <Tabs.Screen
        name="checklist/[checklistid]"
        options={{
          headerTitle: "Checklist",
          title: "Checklist",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
