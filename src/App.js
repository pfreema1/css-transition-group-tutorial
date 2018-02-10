import React, { Component } from "react";
import "./App.css";
import CSSTransitionGroup from "react-transition-group";
import styled from "styled-components";

const AppWrapper = styled.div`
  height: 100vh;
  background: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.2;
`;

const TodoWrapper = styled.div`
  width: 450px;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
`;

const Todo = styled.div`
  width: 100%;
  height: 60px;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { key: 1, text: "meow a lot" },
        { key: 2, text: "make a doodoo" },
        { key: 3, text: "dodadoodoo" }
      ]
    };
  }

  render() {
    return (
      <AppWrapper>
        <TodoWrapper>
          <Input />
          <ul>
            <CSSTransitionGroup
              transitionName="todoTrans"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {this.state.todos.map(todo => {
                return (
                  <li key={todo.key}>
                    <Todo>{todo.text}</Todo>
                  </li>
                );
              })}
            </CSSTransitionGroup>
          </ul>
        </TodoWrapper>
      </AppWrapper>
    );
  }
}

export default App;
