import React, { Component } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import params from "./src/params";
import Field from "./src/components/Field";
import Flag from "./src/components/Flag";
import MineField from "./src/components/MineField";
import Header from "./src/components/Header";
import LevelSelection from "./src/screens/LevelSelection";
import { createMinedBoard, openField, hadExplosion, wonGame, showMines, cloneBoard, invertFlag, flagsUsed } from "./src/function"

type AppState = {
  board: any[][];
  won: boolean;
  lost: boolean;
  showLevelSelection: boolean;
  gameId: number;
}
export default class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
      gameId: (this.state?.gameId || 0) + 1,
    }
  }

  onSelectField = (row: number, column: number) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns!', 'Você venceu!')
      console.log('ganhou')
    }
    this.setState({ board, won })
  }

  onFieldOpen = (row: number, column: number) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)
    if (lost) {
      showMines(board)
      Alert.alert('Perdeeu!', 'Minas explodiram')
      console.log('perdeu')
    }
    if (won) {
      Alert.alert('Parabéns!', 'Você venceu!')
      console.log('ganhou')
    }
    this.setState({ board, lost, won })
  }

  onLevelSelected = (level: any) => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}>
        <LevelSelection isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({ showLevelSelection: false })} />
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())} 
          onFlagPress={() => this.setState({ showLevelSelection: true })} />
        <View style={styles.board}>
          <MineField board={this.state.board} 
            key={this.state.gameId}
            onOpenField={this.onFieldOpen}
            onSelectField={this.onSelectField} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#AAA",
  },
  text: {}
});