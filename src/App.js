import React from 'react';
import './App.css';
import frenchPressMachine from './frenchPressMachine';
import { interpret } from 'xstate';

class App extends React.Component {
  state = {
    current: frenchPressMachine.initialState
  }

  service = interpret(frenchPressMachine).onTransition(current => {
    console.log(current.context)
    this.setState({current})
  })

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  render() {
    const { current } = this.state;
    const {send} = this.service;

    return (
      <div className="App">
        <header className="App-header">
        <button disabled={current.matches('filling.water.full') || current.matches('full')} onClick={() => send('ADD_WATER')}>Add water</button>
          <button disabled={current.matches('filling.scoop.full') || current.matches('full')} onClick={() => send('ADD_SCOOP')}>Add scoop</button>
        </header>
      </div>
    );
  }
}

export default App;
