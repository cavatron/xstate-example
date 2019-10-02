import React from 'react';
import { useService } from '@xstate/react';
import {
  Card, CardText, CardBody, CardHeader, Badge
} from 'reactstrap';

export default function ({ actorRef }) {
  const [state] = useService(actorRef);

  return (
    <>
      <Card>
        <CardHeader>Press Status</CardHeader>
        <CardBody>
          <CardText>
            {state.matches('position.raised') && <Badge color="primary">Raised</Badge>}
            {state.matches('position.lowered') && <Badge>Lowered</Badge>}
            {state.matches('beaker.attached') && <Badge color="primary">Attached to beaker</Badge>}
            {state.matches('beaker.detached') && <Badge>Detached from beaker</Badge>}
          </CardText>
        </CardBody>
      </Card>

    </>
  );
}
