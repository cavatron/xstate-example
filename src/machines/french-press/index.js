import { Machine, send, spawn, assign } from 'xstate';
import pressMachine from './press';
import spoutMachine from './spout';
import beakerMachine from './beaker';

export default Machine({
    id: 'frenchPress',
    context: {
        beaker: null,
        spout: null,
        press: null
    },
    entry: assign({
        beaker: () => spawn(beakerMachine),
        spout: () => spawn(spoutMachine),
        press: () => spawn(pressMachine)
    }),
    initial: 'start',
    states: {
        start: {
            on: {
                START: 'raisePress'
            }
        },
        raisePress: {
            after: {
                2000: {
                    actions: [
                        send('RAISE_PRESS', {
                            to: context => context.press
                        })
                    ]
                }
            },
            on: {
                PRESS_RAISED: 'detachPress'
            }
        },
        detachPress: {
            after: {
                2000: {
                    actions: [
                        send('DETACH_PRESS', {
                            to: context => context.press
                        })
                    ]
                }
            },
            on: {
                PRESS_DETACHED: 'beaker'
            }
        },
        beaker: {
            on: {
                BEAKER_STIRRED: 'attachPress'
            }
        },
        
        attachPress: {
            after: {
                2000: {
                    actions: [
                        send('ATTACH_PRESS', {
                            to: context => context.press
                        })
                    ]
                }
            },
            on: {
                PRESS_ATTACHED: 'closeSpout'
            }
        },
        closeSpout: {
            after: {
                2000: {
                    actions: [
                        send('CLOSE', {
                            to: context => context.spout
                        })
                    ]
                }
            },
            on: {
                SPOUT_CLOSED: 'wait'
            }
        },
        wait: {
            after: {
                5000: 'lowerPress'
            }
        },
        lowerPress: {
            after: {
                2000: {
                    actions: [
                        send('LOWER_PRESS', {
                            to: context => context.press
                        })
                    ]
                }
            },
            on: {
                PRESS_LOWERED: 'openSpout'
            }
        },
        openSpout: {
            after: {
                2000: {
                    actions: [
                        send('OPEN', {
                            to: context => context.spout
                        })
                    ]
                }
            },
            on: {
                SPOUT_OPENED: 'ready'
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
