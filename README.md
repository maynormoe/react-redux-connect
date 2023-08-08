# react-redux-connect
react-redux-connect的简单实现

---
theme: juejin
---
## 什么是react-redux
React Redux是一个用于在React应用程序中管理应用状态的库。它建立在React和Redux两个库的基础上，用于更有效地管理和更新应用程序的状态，并帮助组织复杂的应用逻辑。

以下是React Redux的一些主要介绍和作用：

1.  **状态管理：** React应用程序通常具有复杂的状态，例如用户登录信息、数据加载状态、页面之间的交互等。React Redux允许您将整个应用的状态存储在一个单一的全局状态树中。
1.  **单向数据流：** React Redux遵循单向数据流的理念，即状态的更新只能通过派发动作（actions）来触发，然后通过reducers来处理这些动作并更新状态。这有助于使状态管理更可预测和可维护。
1.  **容器组件和展示组件：** React Redux提倡将组件分为容器组件和展示组件。容器组件连接到Redux状态，并处理数据获取、状态更新等逻辑，而展示组件负责渲染UI。
1.  **连接React和Redux：** React组件通过React Redux库提供的`connect`函数连接到Redux状态。这允许您将Redux状态中的特定部分映射到组件的属性，以便在组件中使用这些数据。
1.  **高效更新：** React Redux使用了虚拟DOM的概念，以最小化对实际DOM的操作，从而提高性能。当状态发生变化时，React Redux会智能地更新组件，以确保只有真正需要更新的部分会被重新渲染。
1.  **中间件支持：** Redux本身支持中间件来处理异步操作、日志记录、路由等。React Redux与Redux中间件相结合，使您能够在React组件中处理异步操作，如网络请求。
1.  **可预测性和调试性：** 由于状态变化只能通过派发动作来触发，应用程序的行为变得更加可预测。此外，React Redux提供了强大的开发者工具，用于跟踪状态变化、调试和时间旅行调试。

` 
connect `是React Redux库中的一个函数，用于将React组件与Redux状态进行连接。在组件中访问Redux存储中的状态，并将状态作为组件的属性传递。这使得组件可以获取并响应Redux状态的变化。

`connect`实际上是一个高阶函数，下面让我们去尝试实现一下他。

## 高阶函数connect的实现
### 目录结构

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2f8e09b17b64e41ac8b79c5b439f50b~tplv-k3u1fbpfcp-watermark.image?)

如图所示
hoc目录用来放高阶函数相关代码
我们创建了两个页面组件, 模拟页面之间借助redux进行数据共享


### 获取store对象

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f33db27d6cf846be8947618743dd0153~tplv-k3u1fbpfcp-watermark.image?)

在react-redux中，我们创建的store对象是通过provider传递的，这里我们可以使用context上下文在index.js将store传递给子组件。
#### 1.先创建一个上下文

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9f531d4a33041afb2d3278bad4ca87d~tplv-k3u1fbpfcp-watermark.image?)

#### 2.通过`context.provider`将`store`传给子组件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc2d94a10a2047498773bf7a804ae3aa~tplv-k3u1fbpfcp-watermark.image?)



## 封装高阶函数`connect`

这里直接放代码

```js
import { PureComponent } from "react";
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

```
这个函数是主要的连接函数，用于创建高阶组件来连接组件与存储。它接受两个参数，`mapStateToProps` 和 `mapDispatchToProps`，这些参数用于映射存储状态和派发函数到包装组件的属性。这些参数类型是`function`,
负责将`stor`e中的`state`和`props`映射到组件的props中。
`connect` 函数返回了一个内部函数，这个函数以 `WrapperComponent` 作为参数。这个内部函数实际上是一个高阶组件，会包装传入的组件，以便它可以访问存储的状态和派发函数。
在返回的内部函数内，定义了一个名为 `NewComponent` 的类，它继承自 `PureComponent`。这个类会作为包装后的组件。在这个类中，构造函数用于初始化本地状态，`componentDidMount` 和 `componentWillUnmount` 用于订阅和取消订阅存储的更改，`render` 用于渲染被包装的组件并将`state`和`dispath`作为props传递给组件。

构造函数在组件实例创建时被调用。它通过调用 `mapStateToProps` 将存储的状态映射到本地组件状态。

`componentDidMount` 生命周期方法在组件渲染后调用。在这里，组件订阅存储的变化，以便在存储状态变化时更新。
`componentWillUnmount` 生命周期方法在组件卸载前调用。在这里，取消订阅存储的变化，以防止内存泄漏。
将 `NewComponent` 类的 `contextType` 属性设置为 `StoreContext`，这样组件就可以通过上下文访问存储的状态和派发函数。

最后，将 `connect` 函数导出，以便其他部分的代码可以使用它来连接组件和存储。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6396ea17c78481e8772c8ca971457f7~tplv-k3u1fbpfcp-watermark.image?)
在index.js再统一导出一下

## 使用测试
### 1.创建store

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./feature/counterSlice";
import homeReducer from "./feature/homeSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
  },
  devTools: true,
});

export default store;

```

### 2.创建slice

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 888,
  },
  reducers: {
    addNumber(state, { payload }) {
      console.log(payload);
      state.counter += payload;
    },
    subNumber(state, { payload }) {
      console.log(payload);
      state.counter -= payload;
    },
  },
});

export const { addNumber, subNumber } = counterSlice.actions;

export default counterSlice.reducer;

```

### 3. 在组件中使用connect高阶函数

```js
import React, { Component } from "react";
import { connect } from "../hoc/connect";
import counterSlice, { subNumber } from "../store/feature/counterSlice";

export class Profie extends Component {
  subNumber(num) {
    this.props.subNumber(num);
  }
  render() {
    const { counter } = this.props;
    return (
      <div>
        <h2> Profie counter: {counter}</h2>
        <div>
          <button onClick={(e) => this.subNumber(5)}>-5</button>
          <button onClick={(e) => this.subNumber(8)}>-8</button>
          <button onClick={(e) => this.subNumber(10)}>-10</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});

const mapDispatchToProps = (dispatch) => ({
  subNumber(num) {
    dispatch(subNumber(num));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profie);

```


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a51969c353c40c3aee9829e07ec1453~tplv-k3u1fbpfcp-watermark.image?)
