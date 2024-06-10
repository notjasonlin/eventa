import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { forwardRef } from "react";

interface IconButtonProps {
  onPress?: () => void;
  icon: React.ReactNode;
}

const IconButton = forwardRef<TouchableOpacity, IconButtonProps>(({ icon, onPress }, ref) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} ref={ref}>
      {icon}
    </TouchableOpacity>
  );
});

export default IconButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  }
});
