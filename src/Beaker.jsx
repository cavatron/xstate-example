import React from 'react';
import { useService } from '@xstate/react';

export default function({ actorRef }) {
  const [state, send] = useService(actorRef);

  const { water, scoops } = state.context;

  return (
    <>
    <div>Water: {water}, Scoops: {scoops}</div>
    {state.matches('unstirred') && <div>Unstirred</div>}
    {state.matches('stirred') && <div>Stirred</div>}
    
    <button disabled={state.matches('filling.water.full') || state.matches('unstirred') || state.matches('stirred')} onClick={() => send('ADD_WATER')}>Add water</button>

          <button disabled={state.matches('filling.scoop.full') || state.matches('unstirred') || state.matches('stirred')} onClick={() => send('ADD_SCOOP')}>Add scoop</button>

          <button disabled={state.matches('empty') || state.matches('stirred') || state.matches('filling.water.filling') || state.matches('filling.scoop.filling')} onClick={() => send('STIR')}>Stir</button>
          </>
  );
}
