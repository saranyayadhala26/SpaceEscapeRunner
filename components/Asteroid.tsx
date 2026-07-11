import React from "react";
import { StyleSheet, Text, View } from "react-native";

type AsteroidProps = {
  asteroidX: number;
  asteroidY: number;
};

export default function Asteroid({
  asteroidX,
  asteroidY,
}: AsteroidProps) {
  return (
    <View
      style={[
        styles.container,
        {
          transform: [
            { translateX: asteroidX },
            { translateY: asteroidY },
          ],
        },
      ]}
    >
      <Text style={styles.asteroid}>☄️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  asteroid: {
    fontSize: 50,
  },
});