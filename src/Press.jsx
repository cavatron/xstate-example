import React from 'react';
import { useService } from '@xstate/react';

export default function({ actorRef }) {
  const [state, send] = useService(actorRef);

  return (
    <>
    {state.matches('position.enabled.raised') && <div>Press raised</div>}
        {state.matches('position.enabled.lowered') && <div>Press lowered</div>}
        {state.matches('beaker.attached') && <div>Attached to beaker</div>}
        {state.matches('beaker.detached') && <div>Detached from beaker</div>}

     <button disabled={state.matches('position.enabled.raised') || state.matches('position.disabled')} onClick={() => send('RAISE_PRESS')}>Raise press</button>
           <button disabled={state.matches('position.enabled.lowered') || state.matches('position.disabled')} onClick={() => send('LOWER_PRESS')}>Lower press</button>

           <button disabled={state.matches('beaker.attached')} onClick={() => send('ATTACH_PRESS')}>Attach press</button>
           <button disabled={state.matches('beaker.detached')} onClick={() => send('DETACH_PRESS')}>Detach press</button>
          </>
  );
}
