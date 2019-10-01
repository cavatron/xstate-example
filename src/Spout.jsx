import React from 'react';
import { useService } from '@xstate/react';

export default function({ actorRef }) {
  const [state, send] = useService(actorRef);

  return (
    <>
        {state.matches('open') && <div>Spout open</div>}
        {state.matches('closed') && <div>Spout closed</div>}

         <button disabled={state.matches('open')} onClick={() => send('OPEN')}>Open spout</button>
         <button disabled={state.matches('closed')} onClick={() => send('CLOSE')}>Close spout</button>
          </>
  );
}
