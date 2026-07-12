import React from "react";
import { Image, StyleSheet } from "react-native";

type ShieldProps = {
  x: number;
  y: number;
};

export default function Shield({
  x,
  y,
}: ShieldProps) {
  return (
    <Image
      source={require("../assets/images/shield.png")}
      style={[
        styles.shield,
        {
          transform: [
            { translateX: x },
            { translateY: y },
          ],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  shield: {
    position: "absolute",
    top: 0,
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});