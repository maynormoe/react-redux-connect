import React, { Component } from "react";
import { connect } from "../hoc/connect";
import counterSlice, { subNumber } from "../store/feature/counterSlice";

export class Profie extends Component {
  subNumber(num) {
    this.props.subNumber(num);
  }
  render() {
    const { counter, banners, recommends } = this.props;
    return (
      <div>
        <h2> Profie counter: {counter}</h2>
        <div>
          <button onClick={(e) => this.subNumber(5)}>-5</button>
          <button onClick={(e) => this.subNumber(8)}>-8</button>
          <button onClick={(e) => this.subNumber(10)}>-10</button>
        </div>
        <div>
          <h2>轮播图</h2>
          <ul>
            {banners.map((banner, index) => {
              return <li key={index}>{banner.title}</li>;
            })}
          </ul>
        </div>
        <div>
          <h2>推荐</h2>
          <ul>
            {recommends.map((recommend, index) => {
              return <li key={index}>{recommend.title}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
  banners: state.home.banners,
  recommends: state.home.recommends,
});

const mapDispatchToProps = (dispatch) => ({
  subNumber(num) {
    dispatch(subNumber(num));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profie);
