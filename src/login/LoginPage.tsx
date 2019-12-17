import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { User, getStarWarsUsersDetails } from "../user/user";
import logo from "../logo.svg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import './loginPage.css';
interface Props {
  onLogin: (user: User) => void;
}
interface State {
  user: User[];
  userName: string;
  password: string;
  error: boolean;
}
class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: [],
      userName: "",
      password: "",
      error: false
    };
    getStarWarsUsersDetails().then((response: any) => {
      this.setState({
        user: response
      });
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  private validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }

  private handleSubmit(event: any) {
    event.preventDefault();
    const user = this.state.user.find(
      (user: User) => user.password === this.state.password && user.username === this.state.userName
    );
    if (user) {
      this.props.onLogin(user);
    } else {
      this.setState({ error: true });
    }
  }
  public render() {
    return (
      <>
        <header className={this.state.user && this.state.user.length ? "hide" : "App-header"}>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {this.state.user.length ? (
            <>
           <h4 className="loginHeading"> Hey User, Please enter your information here</h4>
          <div className="Login">
        
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  User Name
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="text"
                    value={this.state.userName}
                    onFocus={() => this.setState({ error: false })}
                    onChange={(e: any) => this.setState({ userName: e.target.value })}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onFocus={() => this.setState({ error: false })}
                    onChange={(e: any) => this.setState({ password: e.target.value })}
                  />
                </Col>
              </Form.Group>
            </Form>
            <Button size={"sm"} type="submit" onClick={(e: any) => this.handleSubmit(e)}>
              Login
            </Button>
            
          </div>
          <Alert className="alert" show={this.state.error} variant={"danger"}>
              User Name or password entered does not match our records. Please try again.
            </Alert>
          </>
        ) : null}
      </>
    );
  }
}
export default LoginPage;
