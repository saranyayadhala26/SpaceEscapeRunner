import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ExplosionProps = {
  visible: boolean;
  x: number;
  y: number;
};

export default function Explosion({
  visible,
  x,
  y,
}: ExplosionProps) {

  if (!visible) return null;

  return (
    <View
      style={[
        styles.container,
        {
          transform: [
            { translateX: x },
            { translateY: y },
          ],
        },
      ]}
    >
      <Text style={styles.explosion}>
        💥
      </Text>
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

  explosion: {
    fontSize: 70,
  },

});