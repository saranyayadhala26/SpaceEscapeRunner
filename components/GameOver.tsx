import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  score: number;
  onRestart: () => void;
};

export default function GameOver({ score, onRestart }: Props) {
  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>💥 GAME OVER 💥</Text>

      <Text style={styles.score}>
        Final Score: {score}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onRestart}
      >
        <Text style={styles.buttonText}>
          Restart Game
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  title: {
    color: "#FF5252",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 25,
  },

  score: {
    color: "#FFFFFF",
    fontSize: 24,
    marginBottom: 35,
  },

  button: {
    backgroundColor: "#2979FF",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});