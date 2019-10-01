import { Machine, assign } from 'xstate';


const hasMaxWater = (context, event) => context.water >= 350
const hasMaxScoops = (context, event) => context.scoops >= 2

const addWater = assign({
    water: (context, event) => context.water + 50
});

const addScoop = assign({
    scoops: (context, event) => context.scoops + 1
})

const pressStates = {
    type: 'parallel',
    states: {
        mesh: {
            initial: 'lowered',
            lowered: {
                on: {
                    get LOWER_PRESS() {
                        return frenchPressMachine.states.lowered
                    },
                    get RAISE_PRESS() {
                        return frenchPressMachine.states.raised
                    }
                }
            },
            raised: {
                on: {
                    get LOWER_PRESS() {
                        return frenchPressMachine.states.lowered
                    },
                    get RAISE_PRESS() {
                        return frenchPressMachine.states.raised
                    }
                }
            },
        },
        body: {
            initial: 'detached',
            states: {
                attached: {

                },
                detached: {

                }
            }
        },
        spout: {
            initial: 'closed',
            open: {

            },
            closed: {

            }
        }
    }
}

const frenchPressMachine = Machine({
    id: 'frenchPress',
    context: {
        water: 0,
        scoops: 0
    },
    // initial: 'unprepared',
    // states: {
    //     unprepared: {},
    //     prepared: {
    //         type: 'final'
    //     }
    // }
    initial: 'empty',
    states: {
        empty: {
            on: {
                ADD_WATER: {
                    target: 'filling.water',
                    actions: 'addWater'
                },
                ADD_SCOOP: {
                    target: 'filling.scoop',
                    actions: 'addScoop'
                }
            }
        },
        filling: {
            type: 'parallel',
            states: {
                water: {
                    initial: 'filling',
                    states: {
                        filling: {
                            on: {
                                '': {
                                    target: 'full',
                                    cond: 'hasMaxWater'
                                },
                                ADD_WATER: {
                                    target: 'filling',
                                    actions: 'addWater'
                                }
                            }
                        },
                        full: { type: 'final' }
                    }

                },
                scoop: {
                    initial: 'filling',
                    states: {
                        filling: {
                            on: {
                                '': {
                                    target: 'full',
                                    cond: 'hasMaxScoops'
                                },
                                ADD_SCOOP: {
                                    target: 'filling',
                                    actions: 'addScoop'
                                }
                            }
                        },
                        full: { type: 'final' }
                    }
                }
            },
            onDone: 'full'
        },
        full: {}
    }
}, {
        guards: {
            hasMaxWater,
            hasMaxScoops
        },
        actions: {
            addWater,
            addScoop
        }
    })

export default frenchPressMachine;
