import { Machine, assign, sendParent } from 'xstate';

const hasMaxWater = (context, event) => context.water >= 350
const hasMaxScoops = (context, event) => context.scoops >= 2
const notEmpty = (context, event) => context.water > 0 || context.scoops > 0
const hasBeenStirred = (context, event) => context.hasBeenStirred

const addWater = assign({
    water: (context, event) => context.water + 50
});

const addScoop = assign({
    scoops: (context, event) => context.scoops + 1
})

const stir = assign({
    hasBeenStirred: true
})

export default Machine({
    id: 'beaker',
    context: {
        water: 0,
        scoops: 0,
        hasBeenStirred: false
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
                        '': {
                            target: 'stirred',
                            cond: 'hasBeenStirred'
                        },
                        STIR: {
                            target: 'stirred',
                            actions: [stir]
                        }
                    }
                },
                stirred: {
                    entry: sendParent('BEAKER_STIRRED')
                }
            }
        },
        disabled: {
            on: {
                ENABLE: 'enabled'
            }
        }
    }
}, {
        guards: {
            hasMaxWater,
            hasMaxScoops,
            notEmpty,
            hasBeenStirred
        },
        actions: {
            addWater,
            addScoop,
            stir
        }
    })
