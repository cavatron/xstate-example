import React from 'react';
import { useService } from '@xstate/react';

import {
  Card, CardText, CardBody, CardHeader, Badge
} from 'reactstrap';

export default function ({ actorRef }) {
  const [state] = useService(actorRef);

  return (

    <Card>
      <CardHeader>Spout Status</CardHeader>
      <CardBody>
        <CardText>
          {state.matches('open') && <Badge color="primary">Open</Badge>}
          {state.matches('closed') && <Badge>Closed</Badge>}
        </CardText>
      </CardBody>
    </Card>
  );
}
