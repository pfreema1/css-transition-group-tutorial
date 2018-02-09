import React, { Component } from "react";
import CSSTransitionGroup from "react-addons-css-transition-group";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: ["hello", "world", "click", "me"]
    };
  }

  handleAdd = () => {
    const newItems = this.state.items.concat([prompt("Enter some text")]);
    this.setState({ items: newItems });
  };

  handleRemove = i => {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  };

  render() {
    const items = this.state.items.map((item, i) => (
      <div
        key={item}
        className="item"
        onClick={this.handleRemove.bind(null, i)}
      >
        {item}
      </div>
    ));

    return (
      <div>
        <button onClick={this.handleAdd}>Add item</button>
        <CSSTransitionGroup
          transitionName="transStyles"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default App;
