import { Machine, sendParent } from 'xstate';

export default Machine({
    id: 'press',
    type: 'parallel',
    states: {
        position: {
            initial: 'lowered',
            states: {
                raised: {
                    on: {
                        LOWER_PRESS: {
                            target: 'lowered',
                            actions: [sendParent('LOWER_PRESS')]
                        },
                        
                    }
                },
                lowered: {
                    on: {
                        RAISE_PRESS: {
                            target: 'raised',
                            actions: [sendParent('RAISE_PRESS')]
                        },
                    }
                }
            }
        },
        beaker: {
            initial: 'detached',
            states: {
                attached: {
                    on: {
                        DETACH_PRESS: {
                            target: 'detached',
                            actions: [sendParent('DETACH_PRESS')]
                        }
                    }
                },
                detached: {
                    on: {
                        ATTACH_PRESS: {
                            target: 'attached',
                            actions: [sendParent('ATTACH_PRESS')]
                        }
                    }
                }
            }
        }
    }
})
