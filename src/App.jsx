import React from 'react';
import Beaker from './Beaker.jsx';
import Spout from './Spout.jsx';
import Press from './Press.jsx';
import frenchPressMachine from './machines/french-press';
import { useMachine } from '@xstate/react';

export default function () {
  const [state, send] = useMachine(frenchPressMachine);

  const { beaker, spout, press } = state.context;

  return (
    <div className="container">
      <div className="row text-center align-items-center">
        <div className="col">
          <Press actorRef={press} />
        </div>
        <div className="col">

          {state.matches('start') && <button onClick={() => send('START')}>Start</button>}

          {state.matches('raisePress') && <div>Raising press</div>}
          {state.matches('detachPress') && <div>Detaching press</div>}
          {state.matches('beaker') && <Beaker actorRef={beaker} />}

          {state.matches('attachPress') && <div>Attaching press</div>}
          {state.matches('closeSpout') && <div>Closing spout</div>}
          {state.matches('wait') && <div>Waiting</div>}
          {state.matches('lowerPress') && <div>Lowering press</div>}
          {state.matches('openSpout') && <div>Opening spout</div>}
          {state.matches('ready') && <>
            <div>Ready</div>
            <button onClick={() => send('POUR')}>Pour</button>
          </>}
          {state.matches('served') && <div>Served. Enjoy!</div>}
        </div>
        <div className="col">
          <Spout actorRef={spout} />
        </div>




      </div>
    </div>
  );
}
