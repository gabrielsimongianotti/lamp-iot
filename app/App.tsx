import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import LottieView from "lottie-react-native";
import lampLight from "./assets/lampLight.json";
import circle from "./assets/circle.json";
import api from "./services/api";

export default function App() {
  const [lottieAnimation, setLottieAnimation] = useState(new Animated.Value(0));
  const [revertLottie, setRevertLottie] = useState(false);

  const hanbleAnimation = useCallback(async () => {
    Animated.timing(lottieAnimation, {
      toValue: revertLottie ? 0 : 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    await api
      .post("/", {
        light: !revertLottie,
      })
      .then((responde) => {
        console.log(responde.status);

        setRevertLottie(!revertLottie);
      })
      .catch((error) => {
        Animated.timing(lottieAnimation, {
          toValue: !revertLottie ? 0 : 1,
          duration: 2500,
          useNativeDriver: true,
        }).start();
      });
  }, [revertLottie, lottieAnimation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={{ ...styles.shadows, ...styles.cardLamp }}
        onPress={hanbleAnimation}
      >
        <LottieView
          style={{
            height: 300,
          }}
          resizeMode="cover"
          speed={1}
          source={lampLight}
          progress={lottieAnimation}
        />
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    flex: 1,
    padding: 20,
  },

  cardLamp: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flex: 3,
    width: "100%",
    margin: 10,
    backgroundColor: "#fff",
  },

  card: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flex: 1,
    width: "100%",
    margin: 10,
    backgroundColor: "#fff",
  },

  shadows: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  cost: {
    fontSize: 30,
    color: "#000",
  },
});
