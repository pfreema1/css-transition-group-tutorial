import React, { Component } from "react";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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

const Todo = styled.li`
  width: 100%;
  height: ${props => (props.enterFinished ? "60px" : "0")}
  display: flex;
  justify-content: center;
  align-items: center;
  background: skyblue;
  transition: all 0.5s ease-in-out;
  border 1px solid yellow;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { key: 1, text: "meow a lot" },
        { key: 2, text: "make a doodoo" },
        { key: 3, text: "dodadoodoo" }
      ],
      value: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    //make new object for new todo
    let tempTodo = {
      key: Date.now(),
      text: this.state.value
    };

    this.setState({
      todos: [tempTodo].concat(this.state.todos),
      value: ""
    });
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleTodoClickDelete = key => {
    let newTodos = this.state.todos.filter(todo => {
      return todo.key !== key;
    });

    this.setState({
      todos: newTodos
    });
  };

  handleOnEntered = elem => {
    elem.style.height = "60px";
    console.log(elem);
  };

  handleOnExit = elem => {
    elem.style.height = "";
  };

  render() {
    return (
      <AppWrapper>
        <TodoWrapper>
          <form onSubmit={this.handleSubmit}>
            <Input onChange={this.handleChange} value={this.state.value} />
          </form>
          <ul>
            <TransitionGroup>
              {this.state.todos.map(todo => {
                return (
                  <CSSTransition
                    classNames="todoTrans"
                    timeout={{ enter: 500, exit: 500 }}
                    appear={true}
                    key={todo.key}
                    onEntered={this.handleOnEntered}
                    onExit={this.handleOnExit}
                  >
                    <Todo
                      onClick={this.handleTodoClickDelete.bind(null, todo.key)}
                    >
                      {todo.text}
                    </Todo>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </ul>
        </TodoWrapper>
      </AppWrapper>
    );
  }
}

export default App;
