import { Machine, send } from 'xstate';
import pressMachine from './press';
import spoutMachine from './spout';
import beakerMachine from './beaker';

export default Machine({
    id: 'frenchPress',
    initial: 'preparing',
    states: {
        preparing: {
            invoke: {
                src: beakerMachine,
                onDone: 'cooking'
            },
        },
        cooking: {
            after: {
                5000: 'ready'
            }
        },
        ready: {
            on: {
                POUR: 'served'
            }
        },
        served: {
            type: 'final'
        }
    }
})
