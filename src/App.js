import React, { Component } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Transition from "react-transition-group/Transition";
import "./App.css";

/*****************************
 ******************************
 **
 **		Card Component
 **
 ******************************
 ******************************/

function Card({ children, onRemove }) {
  return (
    <div className="card">
      {children}
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}
/*****************************
 ******************************
 **
 **		Board Component
 **
 ******************************
 ******************************/

function Board({ children }) {
  return <ul className="board">{children}</ul>;
}

/*****************************
 ******************************
 **		this is a component that wraps children in a <Transition/> component.
 **    -'children' is the element to be animated
 **    -'duration' is the duration of the animation in ms
 **    -the 'in' props will be provided by <TransitionGroup/>
 **
 ******************************
 ******************************/

function FadeAndSlideTransition({ children, duration, in: inProp }) {
  //default styles
  const defaultStyle = {
    transition: `${duration}ms ease-in`,
    transitionProperty: "opacity, transform"
  };

  //styles that will be applied to children as the status of the transition changes.
  //-each key of the 'transitionStyles' object matches the name of a 'status' provided by <Transition />
  const transitionStyles = {
    entering: {
      opacity: 0,
      transform: "translateY(-10%)"
    },
    entered: {
      opacity: 1,
      transform: "translateY(0)"
    },
    exiting: {
      opacity: 0,
      transform: "translateY(-10%)"
    }
  };

  //wrap child node in <Transition />
  return (
    <Transition
      in={inProp}
      timeout={{
        enter: 0, //0 starts animation immediately
        exit: duration //set exit timeout to 'duration' so that the 'exited' status wont be applied until animation finishes
      }}
    >
      {status => {
        //'children' is a function that receives the current status of the animation
        if (status === "exited") {
          return null;
        }

        console.log("status:  ", status);
        console.log("children:  ", children);

        // apply different styles to children based on the current value of 'status'
        const currentStyles = transitionStyles[status];
        return React.cloneElement(children, {
          style: Object.assign({}, defaultStyle, currentStyles)
        });
      }}
    </Transition>
  );
}

/*****************************
 ******************************
 **
 **		App Component
 **
 ******************************
 ******************************/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };

    this.addCard = this.addCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.removeLastCard = this.removeLastCard.bind(this);
  }

  addCard() {
    const { cards } = this.state;
    const id = cards.length + 1;
    const newCard = {
      id,
      content: `Card ${id}`
    };
    this.setState({
      cards: cards.concat([newCard])
    });
  }

  removeCard(id) {
    const { cards } = this.state;
    this.setState({
      cards: cards.filter(card => card.id !== id)
    });
  }

  removeLastCard() {
    const { cards } = this.state;
    this.setState({
      cards: cards.slice(0, -1)
    });
  }

  render() {
    const { cards } = this.state;

    return (
      <main className="container">
        <h1>React Transition Demo</h1>
        <button onClick={this.addCard}>Add a card</button>
        <button onClick={this.removeLastCard}>Remove a card</button>
        <TransitionGroup component={Board}>
          {cards.map(card => {
            return (
              <FadeAndSlideTransition duration={150} key={card.id}>
                <li className="board__item" key={card.id}>
                  <Card
                    onRemove={() => {
                      this.removeCard(card.id);
                    }}
                  >
                    {card.content}
                  </Card>
                </li>
              </FadeAndSlideTransition>
            );
          })}
        </TransitionGroup>
      </main>
    );
  }
}

export default App;
