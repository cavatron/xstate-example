import React from 'react';
import { useService } from '@xstate/react';

import { Badge, Button, Container, Row, Col } from 'reactstrap';

export default function ({ actorRef }) {
  const [state, send] = useService(actorRef);

  const { water, scoops } = state.context;

  return (

    <Container>
      <Row>
        <Col>
          <p>Water: {water} mL</p>
        </Col>
        <Col>
          <p>Coffee scoops: {scoops}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {state.matches('unstirred') && <Badge>Unstirred</Badge>}
        </Col>
      </Row>
      <Row>
        <Col>

          <Button disabled={state.matches('filling.water.full') || state.matches('unstirred') || state.matches('stirred')} onClick={() => send('ADD_WATER')}>Add water</Button>
        </Col>
        <Col>


          <Button disabled={state.matches('filling.scoop.full') || state.matches('unstirred') || state.matches('stirred')} onClick={() => send('ADD_SCOOP')}>Add scoop</Button>
        </Col>
        <Col>

          <Button disabled={state.matches('empty') || state.matches('stirred') || state.matches('filling.water.filling') || state.matches('filling.scoop.filling')} onClick={() => send('STIR')}>Stir</Button>
        </Col>
      </Row>
    </Container>







  );
}
