import React, { PureComponent } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profie";
import "./style.css";
import { connect } from "./hoc/connect";

class App extends PureComponent {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { counter } = this.props;
    return (
      <div>
        <h2>App: {counter}</h2>
        <div className="pages">
          <Home></Home>
          <Profile></Profile>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
