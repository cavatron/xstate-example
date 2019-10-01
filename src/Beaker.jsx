import React from 'react';
import { useService } from '@xstate/react';

export default function({ actorRef }) {
  const [state, send] = useService(actorRef);

  const { water, scoops } = state.context;

  return (
    <>
    <div>Water: {water}, Scoops: {scoops}</div>
    {state.matches('enabled.unstirred') && <div>Unstirred</div>}
    {state.matches('enabled.stirred') && <div>Stirred</div>}

    <button disabled={state.matches('enabled.filling.water.full') || state.matches('enabled.unstirred') || state.matches('enabled.stirred') || state.matches('disabled')} onClick={() => send('ADD_WATER')}>Add water</button>

          <button disabled={state.matches('enabled.filling.scoop.full') || state.matches('enabled.unstirred') || state.matches('enabled.stirred') || state.matches('disabled')} onClick={() => send('ADD_SCOOP')}>Add scoop</button>

          <button disabled={state.matches('enabled.empty') || state.matches('enabled.stirred') || state.matches('enabled.filling.water.filling') || state.matches('disabled') || state.matches('enabled.filling.scoop.filling')} onClick={() => send('STIR')}>Stir</button>
          </>
  );
}
