import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center"
  },

  tilesContainer: width => ({
    height: width * 0.875,
    width: width * 0.875,
    flexDirection: "row"
  })
});
