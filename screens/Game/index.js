import React from "react";
import { View, Dimensions, TouchableOpacity, Text, Image } from "react-native";
import { Header } from "../../components";
import styles from "./styles";
import { generateRGB, mutateRGB } from "../../utilities/colors";

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      points: 0,
      timeLeft: 15,
      rgb: generateRGB(),
      isPaused: false,
      size: 2
    };

    this.state = { ...this.initialState };
  }

  componentDidMount = () => {
    this.generateNewRound();
    this.interval = setInterval(() => {
      const { isPaused, timeLeft } = this.state;
      !isPaused &&
        timeLeft >= 0 &&
        this.setState(state => ({
          timeLeft: state.timeLeft - 1
        }));
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  generateSizeIndex = size => {
    return Math.floor(Math.random() * size);
  };

  generateNewRound = () => {
    const RGB = generateRGB();
    const mRGB = mutateRGB(RGB);
    const { points } = this.state;
    const size = Math.min(Math.max(Math.floor(Math.sqrt(points)), 2), 5);
    this.setState({
      size,
      diffTileIndex: [
        this.generateSizeIndex(size),
        this.generateSizeIndex(size)
      ],
      diffTileColor: `rgb(${mRGB.r}, ${mRGB.g}, ${mRGB.b})`,
      rgb: RGB
    });
  };

  onTilePress = (rowIndex, columnIndex) => {
    const { diffTileIndex, points, timeLeft } = this.state;
    if (rowIndex == diffTileIndex[0] && columnIndex == diffTileIndex[1]) {
      // good tile
      this.setState({ points: points + 1, timeLeft: timeLeft + 2 }, () => {
        this.generateNewRound();
      });
    } else {
      // wrong tile
      this.setState({ timeLeft: timeLeft - 2 });
    }
  };

  onBottomBarPress = () => {
    const { timeLeft, isPaused } = this.state;
    const lost = timeLeft < 0;
    let newState = {};
    let stateCb = null;

    if (lost) {
      newState = { ...this.initialState };
      stateCb = this.generateNewRound;
    } else {
      newState.isPaused = !isPaused;
    }

    this.setState(newState, () => stateCb && stateCb());
  };

  render() {
    const {
      rgb,
      size,
      diffTileIndex,
      diffTileColor,
      points,
      timeLeft,
      isPaused
    } = this.state;
    if (!diffTileIndex) return null;

    const { width } = Dimensions.get("window");
    const lost = timeLeft < 0;

    const bottomIcon = lost
      ? require("../../assets/icons/replay.png")
      : isPaused
      ? require("../../assets/icons/play.png")
      : require("../../assets/icons/pause.png");

    return (
      <View style={styles.container}>
        <Header fontSize={30} />

        {/* GRID */}
        {!isPaused && !lost && (
          <View style={styles.tilesContainer(width)}>
            {Array(size)
              .fill()
              .map((val, columnIndex) => (
                <View
                  style={{ flex: 1, flexDirection: "column" }}
                  key={columnIndex}
                >
                  {Array(size)
                    .fill()
                    .map((val, rowIndex) => (
                      <TouchableOpacity
                        key={`${rowIndex}.${columnIndex}`}
                        style={{
                          flex: 1,
                          backgroundColor:
                            rowIndex === diffTileIndex[0] &&
                            columnIndex === diffTileIndex[1]
                              ? diffTileColor
                              : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                          margin: 2
                        }}
                        onPress={() => this.onTilePress(rowIndex, columnIndex)}
                      />
                    ))}
                </View>
              ))}
          </View>
        )}

        {/* BOTTOM */}
        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.counterCount}>{points}</Text>
            <Text style={styles.counterLabel}>points</Text>
          </View>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity onPress={this.onBottomBarPress}>
              <Image source={bottomIcon} style={styles.bottomIcon} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.counterCount}>
              {timeLeft < 0 ? "No" : timeLeft}
            </Text>
            <Text style={styles.counterLabel}>seconds left</Text>
          </View>
        </View>

        {/* BEST SCORES */}
        <View style={styles.bestContainer}>
          <View style={styles.bestGrids}>
            <Image
              source={require("../../assets/icons/trophy.png")}
              style={styles.bestIcon}
            />
            <Text style={styles.bestLabel}>0</Text>
          </View>

          <View style={styles.bestGrids}>
            <Text>:p</Text>
          </View>

          <View style={styles.bestGrids}>
            <Image
              source={require("../../assets/icons/clock.png")}
              style={styles.bestIcon}
            />
            <Text style={styles.bestLabel}>0</Text>
          </View>
        </View>
      </View>
    );
  }
}
