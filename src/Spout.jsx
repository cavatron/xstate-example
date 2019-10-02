import React from 'react';
import { useService } from '@xstate/react';

export default function ({ actorRef }) {
  const [state, send] = useService(actorRef);

  return (
    <>
      {state.matches('open') && <div>Spout open</div>}
      {state.matches('closed') && <div>Spout closed</div>}


    </>
  );
}
