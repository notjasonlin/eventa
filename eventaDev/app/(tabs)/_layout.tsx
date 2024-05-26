import { Tabs } from "expo-router";
import NavButton from "../../components/NavButton";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>)
        }}
      />
      <Tabs.Screen
        name="users/[id]"
        options={{
          headerTitle: "User Page",
          title: "User",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>)
        }}
      />
      <Tabs.Screen
        name="vendors/[vendorid]"
        options={{
          headerTitle: "Vendor", // Change into vendor name in the future
          title: "Vendor",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>)
        }}
      />
      <Tabs.Screen
        name="budget/[budgetid]"
        options={{
          headerTitle: "Smart Budget",
          title: "Budget",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>)
        }}
      />
      <Tabs.Screen
        name="checklist/[checklistid]"
        options={{
          headerTitle: "Checklist",
          title: "Checklist",
          headerRight: () => (<NavButton destination="(messages)/1">Messages</NavButton>)
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
