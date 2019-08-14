import { StyleSheet, Dimensions } from "react-native";

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
  }),

  bottomContainer: {
    width: Dimensions.get("window").width * 0.875,
    flexDirection: "row"
  },
  bottomIcon: {
    width: 45,
    height: 45,
  },

  counterCount: {
    fontFamily: "dogbyte",
    textAlign: "center",
    color: "#eee",
    fontSize: 50
  },
  counterLabel: {
    fontFamily: "dogbyte",
    textAlign: "center",
    color: "#bbb",
    fontSize: 20
  },

  bestContainer: {
    marginTop: 10,
    flexDirection: "row",
    color: "#bbb",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.875
  },
  bestGrids: {
    fontFamily: "dogbyte",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#bbb"
  },
  bestIcon: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  bestLabel: {
    fontFamily: "dogbyte",
    color: "#bbb",
    fontSize: 25
  },

  pausedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pausedText: {
    fontFamily: 'dogbyte',
    textAlign: 'center',
    color: '#eee',
    marginTop: 20,
    fontSize: 60,
  },
  pausedIcon: {
    width: 80,
    height: 80
  }
});
