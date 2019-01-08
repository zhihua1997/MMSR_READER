import React from "react";
import { Modal, View } from "react-native";
import { Button } from "../tools/button";

const CustomProgressBar = ({ visible, children, onAccept, onDecline }) => (
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
        {children}

        <View style={{ flexDirection: "row", width: 250 }}>
          <Button onPress={onAccept}>OK</Button>
          <Button onPress={onDecline}>Cancel</Button>
        </View>
      </View>
    </View>
  </Modal>
);

export default CustomProgressBar;
