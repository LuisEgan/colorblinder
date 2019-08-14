import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import { Font, AppLoading } from "expo";
import Routes from "./screens/Router";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    initialRouteName: "Home",
    headerModer: "none",
  },
);
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFontLoaded: false
    };
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      dogbyte: require("./assets/fonts/dogbyte.otf")
    });

    this.setState({
      isFontLoaded: true
    });
  };

  render = () => {
    const { isFontLoaded } = this.state;

    if (!isFontLoaded) {
      return <AppLoading />;
    }

    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <Routes />
      </Fragment>
    );
  };
}

export default App;
