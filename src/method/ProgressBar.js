import React from "react";
import { Modal, View, Text, ActivityIndicator, Button } from "react-native";

const CustomProgressBar = ({ visible }) => (
  <Modal transparent onRequestClose={() => null} visible={visible}>
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
      }}
    >
      <View style={{ borderRadius: 10, backgroundColor: "white", padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: "200" }}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);

export default CustomProgressBar;
