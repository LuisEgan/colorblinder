import React from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Header } from "../../components";
import styles from "./styles";
import { generateRGB, mutateRGB } from "../../utilities/colors";

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: 0,
      timeLeft: 15,
      rgb: generateRGB()
    };
  }

  componentDidMount = () => {
    this.generateNewRound();
    this.interval = setInterval(() => {
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

  render() {
    const { rgb, size, diffTileIndex, diffTileColor } = this.state;
    const { width } = Dimensions.get("window");

    if (!diffTileIndex) return null;

    return (
      <View style={styles.container}>
        <Header fontSize={30} />

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
      </View>
    );
  }
}
