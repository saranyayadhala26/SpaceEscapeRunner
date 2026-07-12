import React from "react";
import { Image, StyleSheet } from "react-native";

type HeartProps = {
  x: number;
  y: number;
};

export default function Heart({
  x,
  y,
}: HeartProps) {
  return (
    <Image
      source={require("../assets/images/heart.png")}
      style={[
        styles.heart,
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
  heart: {
    position: "absolute",
    top: 0,
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});