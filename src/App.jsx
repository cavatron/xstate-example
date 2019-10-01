import React from 'react';
import Beaker from './Beaker.jsx';
import Spout from './Spout.jsx';
import Press from './Press.jsx';
import './App.css';
import frenchPressMachine from './machines/french-press';
import { useMachine } from '@xstate/react';

export default function() {
  const [state, send] = useMachine(frenchPressMachine);

  const { beaker, press, spout } = state.context;

  return (
           <div className="App">
         <header className="App-header">
    <Beaker actorRef={beaker} />
    <Press actorRef={press} />
    <Spout actorRef={spout} />

           <button disabled={!state.matches('ready')} onClick={() => send('POUR')}>Pour</button>
           {state.matches('cooking') && <div>Cooking</div>}
           {state.matches('ready') && <div>Done</div>}
           {state.matches('served') && <div>Served</div>}
    </header>
      </div>
  );
}
