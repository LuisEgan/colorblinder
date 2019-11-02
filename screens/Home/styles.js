import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center"
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center"
  },

  play: {
    fontSize: 45,
    fontFamily: "dogbyte",
    color: "#ecf0f1",
    marginTop: 5
  },
  playIcon: {
    height: 60,
    width: 60,
    marginRight: 15
  },

  highscore: {
    fontSize: 28.5,
    fontFamily: "dogbyte",
    color: "#ecf0f1",
    marginTop: 5
  },

  trophyIcon: {
    height: 45,
    width: 45,
    marginRight: 12.5
  },

  leaderboard: {
    fontSize: 28.5,
    fontFamily: "dogbyte",
    color: "#d9d9d9",
    marginTop: 5
  },

  bottomContainer: {
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 12.5 // the 2.5px bottom margin from the text is subtracted from the 15px spacing
  },
  copyrightText: {
    fontSize: 16,
    fontFamily: "dogbyte",
    marginBottom: 2.5
  },
  soundIcon: {
      width: 30,
      height: 30
  }
});