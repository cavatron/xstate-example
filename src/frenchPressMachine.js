import { Machine, assign } from 'xstate';


const hasMaxWater = (context, event) => context.water >= 350
const hasMaxScoops = (context, event) => context.scoops >= 2

const addWater = assign({
    water: (context, event) => context.water + 50
});


const addScoop = assign({
    scoops: (context, event) => context.scoops + 1
})

const emptyBeaker = assign({
    water: 0,
    scoops: 0
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

const beakerStates = {
    initial: 'empty',
    states: {
        empty: {
            on: {
                ADD_WATER: {
                    target: 'filling',
                    actions: 'addWater'
                },
                ADD_SCOOP: {
                    target: 'filling',
                    actions: 'addScoop'
                }
            }
        },
        filling: {
            on: {
                '': [
                    {
                        target: 'full',
                        cond: 'hasMaxWater'
                    },
                    {
                        target: 'full',
                        cond: 'hasMaxScoops'
                    }
                ],
                ADD_WATER: {
                    target: 'filling',
                    actions: 'addWater'
                },
                ADD_SCOOP: {
                    target: 'filling',
                    actions: 'addScoop'
                }
            }
        },
        full: {
            type: 'parallel',

            on: {
                RESET: {
                    target: 'empty',
                    actions: 'emptyBeaker'
                }
            },

            initial: 'unstirred',
            states: {
                stirred: {

                },
                unstirred: {

                }
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
    initial: 'unprepared',
    states: {
        unprepared: {},
        prepared: {
            type: 'final'
        }
    }
}, {
    guards: {
        isBeakerFull
    }
})
