import React from 'react';
import './App.css';
import frenchPressMachine from './machines/french-press';
import { interpret } from 'xstate';

class App extends React.Component {
  state = {
    current: frenchPressMachine.initialState
  }

  service = interpret(frenchPressMachine).onTransition(current => {
    console.log(current.context)
    this.setState({ current })
  })

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  render() {
    const { current } = this.state;
    const { send } = this.service;

    return (
      <div className="App">
        <header className="App-header">
          <button disabled={current.matches('beaker.filling.water.full') || current.matches('beaker.unstirred') || current.matches('beaker.stirred')} onClick={() => send('ADD_WATER', {to: 'beaker'})}>Add water</button>

          <button disabled={current.matches('filling.scoop.full') || current.matches('unstirred') || current.matches('stirred')} onClick={() => send('ADD_SCOOP', {to: 'beaker'})}>Add scoop</button>

          <button disabled={current.matches('empty') || current.matches('stirred') || current.matches('filling.water.filling') || current.matches('filling.scoop.filling')} onClick={() => send('STIR')}>Stir</button>

          <button disabled={current.matches('open')} onClick={() => send('OPEN')}>Open spout</button>
          <button disabled={current.matches('closed')} onClick={() => send('CLOSE')}>Close spout</button>

          <button disabled={current.matches('position.raised')} onClick={() => send('RAISE_PRESS')}>Raise press</button>
          <button disabled={current.matches('position.lowered')} onClick={() => send('LOWER_PRESS')}>Lower press</button>

          <button disabled={current.matches('beaker.attached')} onClick={() => send('ATTACH_PRESS')}>Attach press</button>
          <button disabled={current.matches('beaker.detached')} onClick={() => send('DETACH_PRESS')}>Detach press</button>

         

          <button disabled={!current.matches('ready')} onClick={() => send('POUR')}>Pour</button>

          {current.matches('cooking') && <div>Cooking</div>}
          {current.matches('ready') && <div>Done</div>}
          {current.matches('served') && <div>Served</div>}

          <div></div>
        </header>
      </div>
    );
  }
}

export default App;
