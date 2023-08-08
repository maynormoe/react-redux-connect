import React, { Component } from "react";
// import { connect } from "react-redux";
import { connect } from "../hoc/connect";
import { addNumber } from "../store/feature/counterSlice";
import { fetchHomeDataAction } from "../store/feature/homeSlice";
import { PureComponent } from "react";

export class Home extends PureComponent {
  addNumber(num) {
    this.props.addNumber(num);
  }

  componentDidMount() {
    this.props.fetchHomeData();
  }
  render() {
    const { counter } = this.props;
    return (
      <div>
        <div>Home counter: {counter}</div>
        <div>
          <div>
            <button onClick={(e) => this.addNumber(5)}>+5</button>
            <button onClick={(e) => this.addNumber(8)}>+8</button>
            <button onClick={(e) => this.addNumber(10)}>+10</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumber(num));
  },
  fetchHomeData() {
    dispatch(fetchHomeDataAction({ name: "444" }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
