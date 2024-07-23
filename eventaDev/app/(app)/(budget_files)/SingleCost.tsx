import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux/store";
import { selectVendorByTypeAndID } from "../../../functions/vendorFunctions/vendorFunctions";
import { useEffect, useState } from "react";
import { GenericVendor } from "../../../interfaces/genericVendorInterface";
import { Cost } from "../../../interfaces/costInterface";
import {
  deleteCost,
  readCost,
} from "../../../functions/budgetFunctions/costFunctions";
import { removeBookedVendor } from "../../../functions/vendorFunctions/bookedVendorFunctions";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  costDeleteTrigger,
  setPackageCost,
  setPackageEventID,
} from "../../../store/redux/budget";
import UpdateCostModal from "../../../components/budget/UpdateCostModal";
import { updateBudget } from "../../../functions/budgetFunctions/budgetFunctions";
import { initializePaymentSheet, openPaymentSheet } from "../../../lib/stripe";

const SingleCost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { costID } = useLocalSearchParams();
  const budgetData = useSelector(
    (state: RootState) => state.budgetSystem.budgetData
  );
  const remoteTriggers = useSelector(
    (state: RootState) => state.budgetSystem.costTriggers
  );
  const [cost, setCost] = useState<Cost | null>(null);
  const [vendor, setVendor] = useState<GenericVendor | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCost = async () => {
      if (budgetData && typeof costID === "string") {
        const data = await readCost(budgetData.id, costID);
        setCost(data);
        console.log("enter");
      }
    };
    fetchCost();
  }, [remoteTriggers[0], remoteTriggers[1], remoteTriggers[2]]); // for added vendors, deletes, and updates

  useEffect(() => {
    if (cost && cost.vendorID) {
      selectVendorByTypeAndID(cost.vendorType, cost.vendorID)
        .then((vendorData) => {
          if (vendorData) {
            // console.log(vendorData[0]);
            setVendor(vendorData[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching vendor:", error);
        });
    }
  }, [cost]);

  const removeCost = async () => {
    const confirmRemove = async () => {
      if (cost && budgetData) {
        await deleteCost(cost.id);
        if (cost.vendorID) {
          await removeBookedVendor(cost.vendorID, budgetData.eventId);
        }
        await updateBudget(
          budgetData.id,
          budgetData.remainder,
          -cost.costInDollar
        );
        dispatch(costDeleteTrigger());
        router.back();
      }
    };
    Alert.alert("Delete this cost?", "Deleting this cost cannot be undone", [
      {
        text: "Delete",
        onPress: confirmRemove,
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const setCostPackage = () => {
    if (cost && budgetData) {
      dispatch(setPackageCost(cost));
      dispatch(setPackageEventID(budgetData?.eventId));
    }
  };

  const handleCheckout = async () => {
    if (cost) {
      await initializePaymentSheet(cost.costInDollar*100);
      const success = await openPaymentSheet();
      if (success) {
        console.log("Payment was successful");
      } else {
        console.log("Payment failed or was canceled");
      }
    }
  };

  return (
    <>
      {cost && !vendor && cost.vendorType !== "other" && (
        <View style={styles.container}>
          <Text style={styles.title}>Book {cost.vendorType}</Text>
          <Link
            href={{
              pathname: "(vendor_files)/VendorTypePage",
              params: {
                type: cost.vendorType,
                title:
                  cost.vendorType.charAt(0).toUpperCase() +
                  cost.vendorType.slice(1),
              },
            }}
            asChild
          >
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={setCostPackage}
            >
              <Text style={styles.buttonText}>Book!</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
      {cost && (vendor || cost.vendorType === "other") && (
        <View style={styles.container}>
          <Text style={styles.title}>Party Cost</Text>
          {vendor && <Text style={styles.vendorName}>{vendor.name}</Text>}
          {!vendor && <Text style={styles.vendorName}>Miscellaneous</Text>}
          <Text style={styles.cost}>{"Cost: $" + cost.costInDollar}</Text>
          <TouchableOpacity style={styles.buttonDanger} onPress={removeCost}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleCheckout}
          >
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
          {showModal && budgetData && (
            <UpdateCostModal
              hideModal={() => setShowModal(false)}
              budget={budgetData}
              cost={cost}
              vendor={vendor}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  vendorName: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  cost: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  buttonPrimary: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonDanger: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SingleCost;
