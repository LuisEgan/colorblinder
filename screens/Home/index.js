import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { Header } from "../../components";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSoundOn: true
    };
  }

  onPlayPress = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("Game");
  };

  onToggleSound = () => {
    console.log("Sound!");
  };

  render() {
    const imageSource = this.state.isSoundOn
      ? require("../../assets/icons/speaker-on.png")
      : require("../../assets/icons/speaker-off.png");

    return (
      <View style={styles.container}>
        <Header fontSize={50} />
        <TouchableOpacity
          onPress={this.onPlayPress}
          style={{ marginTop: 80, ...styles.rowContainer }}
        >
          <Image
            source={require("../../assets/icons/play_arrow.png")}
            style={styles.playIcon}
          />
          <Text style={styles.play}>PLAY!</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20, ...styles.rowContainer }}>
          <Image
            source={require("../../assets/icons/trophy.png")}
            style={styles.trophyIcon}
          />
          <Text style={styles.highscore}>Hi-score: 0</Text>
        </View>

        <View style={{ marginTop: 80, ...styles.rowContainer }}>
          <Image
            source={require("../../assets/icons/leaderboard.png")}
            style={styles.trophyIcon}
          />
          <Text style={styles.leaderboard}>Leaderboard</Text>
        </View>

        <View style={[styles.rowContainer, styles.bottomContainer]}>
          <View>
            <Text style={[styles.copyrightText, { color: "#E64C3C" }]}>
              Music: Komiku
            </Text>
            <Text style={[styles.copyrightText, { color: "#F1C431" }]}>
              SFX: SubspaceAudio
            </Text>
            <Text style={[styles.copyrightText, { color: "#3998DB" }]}>
              Development: RisingStack
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={this.onToggleSound}>
            <Image source={imageSource} style={styles.soundIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
