import React, { Component } from "react";
import { View } from "react-native";
import { Tab } from "./index";
import { Actions } from "react-native-router-flux";

const FooterTab = () => {
  return (
    <View style={styles.barStyle}>
      <Tab
        source={require("../../assets/tabIcon/pen.png")}
        onPress={() => Actions.home()}
      />
      <Tab
        source={require("../../assets/tabIcon/library.png")}
        onPress={() => Actions.library()}
      />
      <Tab
        source={require("../../assets/tabIcon/profile.png")}
        onPress={() => Actions.profile()}
      />
      <Tab
        source={require("../../assets/tabIcon/dashBoad.png")}
        onPress={() => Actions.dashboard()}
      />
    </View>
  );
};

const styles = {
  barStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  }
};

export { FooterTab };
