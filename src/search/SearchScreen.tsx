import React from "react";
import { Planet, getStarWarsPlanetsDetails } from "../planets/planets";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "./searchScreen.css";
interface Props {
  userName: string;
}
interface State {
  planetList: Planet[];
  activeList: Planet[];
}

class SearchScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      planetList: [],
      activeList: []
    };
    getStarWarsPlanetsDetails().then((response: any) => {
      this.setState({
        planetList: response,
        activeList: response
      });
    });
    this.filterPlanets = this.filterPlanets.bind(this);
  }
  private filterPlanets(event: any) {
    const name = event.target.value;
    if (!name) {
      this.setState({
        activeList: this.state.planetList
      });
    } else {
      this.setState({
        activeList: this.state.planetList.filter((planet: Planet) => planet.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
      });
    }
  }

  public render() {
    return (
      <>
        {this.state.planetList.length ? (
          <>
            <input
              className={"inputSearch"}
              type={"text"}
              placeholder={"Enter the planet name"}
              onChange={e => {
                this.filterPlanets(e);
              }}
            />
            <CardGroup>
              {this.state.activeList.map((planet: Planet, index: number) => (
                <Card border={index % 2 === 0 ? "primary" : index % 3 === 0 ? "success" : "warning"} style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Planet - {planet.name}</Card.Title>
                    <Card.Text>
                      <div>Poluplation - {planet.population}</div>
                      <div>Gravity - {planet.gravity}</div>
                      <div>Rotation Period - {planet.rotation_period}</div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          </>
        ) : (
          <h2 style={{ margin: "20px" }}>
            Welcome {this.props.userName}. Hold tight!!, we are loading planet detials for you!
          </h2>
        )}
      </>
    );
  }
}
export default SearchScreen;
