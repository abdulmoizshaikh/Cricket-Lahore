import React from "react";
import { StyleSheet } from "react-native";
import { View, Spinner } from "native-base";

export const SpinnerComponent = () => {
  return (
    <View style={styles.Container}>
      <Spinner />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  Spinner: {}
});
