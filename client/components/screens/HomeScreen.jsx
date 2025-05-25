import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import XboxController from "../XboxController";
import { createSocket } from "../../socket";

export default function HomeScreen() {
  const [ipAddress, setIpAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  const handleConnect = async () => {
    if (!ipAddress) {
      setError("Please enter an IP address");
      return;
    }

    setIsLoading(true);
    setError("");

    // Connect to the server
    const sock = createSocket(ipAddress);
    setSocket(sock);
    setIsConnected(true);
    setIsLoading(false);
  };

  const handleForceDisconnect = () => {
    socket.disconnect();
    setSocket(null);
    setIsConnected(false);
  };

  if (isConnected) {
    return (
      <XboxController
        handleForceDisconnect={handleForceDisconnect}
        socket={socket}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FreeDroidJoy</Text>
      <Text style={styles.subtitle}>Your Mobile Game Controller Solution</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Server IP (e.g., 192.168.1.100)"
          placeholderTextColor="gray"
          value={ipAddress}
          onChangeText={setIpAddress}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[
            styles.connectButton,
            isLoading && styles.connectButtonDisabled,
          ]}
          onPress={handleConnect}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.connectButtonText}>Connect</Text>
          )}
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  connectButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  connectButtonDisabled: {
    backgroundColor: "#007AFF80",
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF3B30",
    marginTop: 10,
    textAlign: "center",
  },
});
