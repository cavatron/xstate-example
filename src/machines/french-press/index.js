import { Machine, send, spawn, assign } from 'xstate';
import pressMachine from './press';
import spoutMachine from './spout';
import beakerMachine from './beaker';

export default Machine({
    id: 'frenchPress',
    initial: 'preparing',
    context: {
        beaker: null,
        spout: null,
        press: null
    },
    states: {
        preparing: {
            entry: assign({
                beaker: () => spawn(beakerMachine),
                spout: () => spawn(spoutMachine),
                press: () => spawn(pressMachine)
            }),
            on: {
                ATTACH_PRESS: {
                    actions: [
                        send('DISABLE', {
                            to: context => context.beaker
                        }),
                        send('DISABLE_REPOSITION', {
                            to: context => context.press
                        })
                     ]
                },
                DETACH_PRESS: {
                    actions: [
                        send('ENABLE', {
                            to: context => context.beaker
                        }),
                        send('ENABLE_REPOSITION', {
                            to: context => context.press
                        })
                    ]
                }
            }
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
