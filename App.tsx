import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import params from "./src/params";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Iniciando Mines!</Text>
        <Text style={styles.text}>Tamanho da grade: 
          {params.getColumnsAmount()}x{params.getRowsAmount()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: params.fontSize,
  },
});