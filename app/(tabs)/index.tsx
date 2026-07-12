import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import Asteroid from "../../components/Asteroid";
import Controls from "../../components/Controls";
import Difficulty from "../../components/Difficulty";
import { BOTTOM_LIMIT, getAsteroidSpeed, getRandomAsteroidX, isCollision, MAX_X, MIN_X, RESET_Y, } from "../../components/GameEngine";
import GameOver from "../../components/GameOver";
import Lives from "../../components/Lives";
import ScoreBoard from "../../components/ScoreBoard";
import Spaceship from "../../components/Spaceship";
import StarBackground from "../../components/StarBackground";
export default function HomeScreen() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [shipX, setShipX] = useState(0);

  const [asteroidX, setAsteroidX] = useState(0);
  const [asteroidY, setAsteroidY] = useState(0);
  const [asteroid2X, setAsteroid2X] = useState(getRandomAsteroidX());
  const [asteroid2Y, setAsteroid2Y] = useState(-300);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  // Asteroid speed increases with score
  const asteroidSpeed = getAsteroidSpeed(score);

  const moveLeft = () => {
    if (!gameOver) {
      setShipX((prev) => Math.max(prev - 20, MIN_X));
    }
  };

  const moveRight = () => {
    if (!gameOver) {
     setShipX((prev) => Math.min(prev + 20, MAX_X));
    }
  };

  // Falling asteroid
  useEffect(() => 
    {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setAsteroidY((prev) => {
        if (prev > BOTTOM_LIMIT) {
  setScore((s) => s + 1);

  setAsteroidX(getRandomAsteroidX());

  return RESET_Y;
}

        return prev + asteroidSpeed;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, asteroidSpeed]);

  useEffect(() => {
  if (!gameStarted || gameOver) return;

  const interval = setInterval(() => {
    setAsteroid2Y((prev) => {
      if (prev > BOTTOM_LIMIT) {

        setScore((s) => s + 1);

        setAsteroid2X(getRandomAsteroidX());

        return -300;
      }

      return prev + asteroidSpeed;
    });
  }, 40);

  return () => clearInterval(interval);

}, [gameStarted, gameOver, asteroidSpeed]);

// Collision Detection
useEffect(() => {
  if (!gameStarted || gameOver) return;

  const hitAsteroid1 = isCollision(
  asteroidX,
  asteroidY,
  shipX
);

const hitAsteroid2 = isCollision(
  asteroid2X,
  asteroid2Y,
  shipX
);

if (hitAsteroid1 || hitAsteroid2) {

  if (lives > 1) {
    setLives((prev) => prev - 1);

    if (hitAsteroid1) {
      setAsteroidY(RESET_Y);
      setAsteroidX(getRandomAsteroidX());
    }

    if (hitAsteroid2) {
      setAsteroid2Y(-300);
      setAsteroid2X(getRandomAsteroidX());
    }

  } else {
    setLives(0);
    setGameOver(true);
  }
}

}, [
  asteroidY,
  asteroidX,
  asteroid2Y,
  asteroid2X,
  shipX,
  lives,
  gameStarted,
  gameOver,
]);

const restartGame = () => {
  setGameOver(false);

  setShipX(0);

  // First asteroid
  setAsteroidX(getRandomAsteroidX());
  setAsteroidY(RESET_Y);

  // Second asteroid
  setAsteroid2X(getRandomAsteroidX());
  setAsteroid2Y(-300);

  // Reset score
  setScore(0);

  // Reset lives
  setLives(3);
};
  return (
    
    <View style={styles.container}>
      <StarBackground />
      {!gameStarted ? (
        <>
          <Text style={styles.title}>
            🚀 Space Escape Runner
          </Text>

          <Text style={styles.scoreText}>
            Current Score : 0
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setGameStarted(true);
              setAsteroidX(getRandomAsteroidX());
            }}
          >
            <Text style={styles.buttonText}>
              Start Game
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.gameContainer}>
          <View style={{ alignItems: "center" }}>
  <ScoreBoard score={score} />
  <Lives lives={lives} />
  <Difficulty score={score} />
</View>

          <Asteroid
            asteroidX={asteroidX}
            asteroidY={asteroidY}
          />
          <Asteroid
          asteroidX={asteroid2X}
          asteroidY={asteroid2Y}
          />

          <Spaceship shipX={shipX} />

          <Controls
            moveLeft={moveLeft}
            moveRight={moveRight}
          />

          {gameOver && (
            <GameOver
              score={score}
              onRestart={restartGame}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#081229",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 50,
    textAlign: "center",
  },

  scoreText: {
    fontSize: 22,
    color: "#FFD54F",
    marginBottom: 40,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2979FF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  gameContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 40,
  },
});