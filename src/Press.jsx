import React from 'react';
import { useService } from '@xstate/react';

export default function ({ actorRef }) {
  const [state, send] = useService(actorRef);

  return (
    <>
      {state.matches('position.raised') && <div>Press raised</div>}
      {state.matches('position.lowered') && <div>Press lowered</div>}
      {state.matches('beaker.attached') && <div>Attached to beaker</div>}
      {state.matches('beaker.detached') && <div>Detached from beaker</div>}
    </>
  );
}
