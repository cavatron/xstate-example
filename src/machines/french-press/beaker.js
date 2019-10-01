import { Machine, assign, sendParent } from 'xstate';

const hasMaxWater = (context, event) => context.water >= 350
const hasMaxScoops = (context, event) => context.scoops >= 2
const notEmpty = (context, event) => context.water > 0 || context.scoops > 0

const addWater = assign({
    water: (context, event) => context.water + 50
});

const addScoop = assign({
    scoops: (context, event) => context.scoops + 1
})

export default Machine({
    id: 'beaker',
    context: {
        water: 0,
        scoops: 0
    },
    initial: 'enabled',
    states: {
        enabled: {
            on: {
                DISABLE: 'disabled'
            },
            initial: 'empty',
            states: {
                empty: {
                    on: {
                        '': {
                            target: 'filling',
                            cond: 'notEmpty'
                        },
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
                    onDone: 'unstirred'
                },
                unstirred: {
                    on: {
                        STIR: 'stirred'
                    }
                },
                
                stirred: {
                    entry: sendParent('BEAKER_STIRRED')
                },
                stirHistory: {
                    type: 'history',
                    default: 'empty'
                },
            }
        },
        disabled: {
            on: {
                ENABLE: 'enabled.stirHistory'
            }
        }
    }
}, {
        guards: {
            hasMaxWater,
            hasMaxScoops,
            notEmpty
        },
        actions: {
            addWater,
            addScoop
        }
    })
