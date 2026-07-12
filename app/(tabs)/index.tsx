import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import Asteroid from "../../components/Asteroid";
import Controls from "../../components/Controls";
import Difficulty from "../../components/Difficulty";
import Explosion from "../../components/Explosion";
import { BOTTOM_LIMIT, getAsteroidSpeed, getRandomAsteroidX, isCollision, MAX_X, MIN_X, RESET_Y, } from "../../components/GameEngine";
import GameOver from "../../components/GameOver";
import Heart from "../../components/Heart";
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
  const [heartX, setHeartX] = useState(getRandomAsteroidX());
  const [heartY, setHeartY] = useState(-800);
  const [heartVisible, setHeartVisible] = useState(false);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
const [showExplosion, setShowExplosion] = useState(false);

const [explosionX, setExplosionX] = useState(0);

const [explosionY, setExplosionY] = useState(0);
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
  setScore((prevScore) => {
  const newScore = prevScore + 1;

  setHighScore((prevHigh) =>
    newScore > prevHigh ? newScore : prevHigh
  );

  return newScore;
});

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
setScore((prevScore) => {
  const newScore = prevScore + 1;

  setHighScore((prevHigh) =>
    newScore > prevHigh ? newScore : prevHigh
  );

  return newScore;
});

        setAsteroid2X(getRandomAsteroidX());

        return -300;
      }

      return prev + asteroidSpeed;
    });
  }, 40);

  return () => clearInterval(interval);

}, [gameStarted, gameOver, asteroidSpeed]);
// Heart Spawn
useEffect(() => {
  if (!gameStarted || gameOver) return;

  const timer = setInterval(() => {
    console.log("Heart Spawned ❤️");

    setHeartVisible(true);
    setHeartX(getRandomAsteroidX());
    setHeartY(-300);

  }, 12000);

  return () => clearInterval(timer);

}, [gameStarted, gameOver]);
useEffect(() => {
  if (!heartVisible) return;

  const interval = setInterval(() => {

    setHeartY((prev) => {

    if (prev > BOTTOM_LIMIT) {
    setHeartVisible(false);
    setHeartX(getRandomAsteroidX());
    return -300;
}
      return prev + 6;

    });

  }, 40);

  return () => clearInterval(interval);

}, [heartVisible]);// ===========================
// HEART SYSTEM
useEffect(() => {
  if (!heartVisible || gameOver) return;

  const verticalHit =
    heartY >= 520 && heartY <= 620;

  const horizontalHit =
    Math.abs(shipX - heartX) < 30;

  if (verticalHit && horizontalHit) {

    if (lives < 3) {
      setLives((prev) => prev + 1);
    }

    setHeartVisible(false);
    setHeartY(-300);
    setHeartX(getRandomAsteroidX());
  }

}, [
  heartX,
  heartY,
  shipX,
  heartVisible,
  lives,
  gameOver,
]);

// ===========================
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
  if (hitAsteroid1) {
  setExplosionX(asteroidX);
  setExplosionY(asteroidY);
}

if (hitAsteroid2) {
  setExplosionX(asteroid2X);
  setExplosionY(asteroid2Y);
}

setShowExplosion(true);

setTimeout(() => {
  setShowExplosion(false);
}, 500);

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

  <Text
    style={{
      color: "#FFD54F",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 6,
    }}
  >
    🏆 High Score : {highScore}
  </Text>

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
          {heartVisible && (
  <Heart
    x={heartX}
    y={heartY}
  />
)}
          <Explosion
  visible={showExplosion}
  x={explosionX}
  y={explosionY}
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