import React from "react";

import "./App.css";
import LoginPage from "./login/LoginPage";
import SearchScreen from "./search/SearchScreen";
import { User } from "./user/user";
interface State {
  userName: string;
  isLoginSuccess: boolean;
}
class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      userName: "",
      isLoginSuccess: false
    };
  }
  public render() {
    return (
      <div className="App">
        {this.state.isLoginSuccess ? (
          <SearchScreen userName={this.state.userName} />
        ) : (
          <LoginPage
            onLogin={(user: User) => {
              this.setState({ isLoginSuccess: true, userName: user.username });
            }}
          />
        )}
      </div>
    );
  }
}

export default App;
