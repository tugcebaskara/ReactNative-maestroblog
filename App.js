import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/navigation";
import BlogContext from "./src/context/BlogContext";

export default function App() {
  const [blogContent, setBlogContent] = useState(null);
  return (
    <BlogContext.Provider value={{ blogContent, setBlogContent }}>
      <AppNavigator/>
    </BlogContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
