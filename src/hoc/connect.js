import { PureComponent, Component } from "react";
import React from "react";
import StoreContext from "./storeContext";

function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrapperComponent) {
    class NewComponent extends PureComponent {
      constructor(props, context) {
        super(props);

        this.state = mapStateToProps(context.getState());
      }
      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.setState(mapStateToProps(this.context.getState()));
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        let stateObj = {};
        let dispatchObj = {};
        if (typeof mapStateToProps === "function") {
          stateObj = mapStateToProps(this.context.getState());
        }

        if (typeof mapDispatchToProps === "function") {
          dispatchObj = mapDispatchToProps(this.context.dispatch);
          console.log(dispatchObj);
        }

        return (
          <WrapperComponent {...this.props} {...this.state} {...dispatchObj} />
        );
      }
    }
    NewComponent.contextType = StoreContext;
    return NewComponent;
  };
}

export { connect };
