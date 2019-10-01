import { Machine } from 'xstate';

export default Machine({
    id: 'press',
    type: 'parallel',
    states: {
        position: {
            initial: 'lowered',
            states: {
                raised: {
                    on: {
                        LOWER_PRESS: 'lowered'
                    }
                },
                lowered: {
                    on: {
                        RAISE_PRESS: 'raised',
                    }
                }
            }
        },
        beaker: {
            initial: 'detached',
            states: {
                attached: {
                    on: {
                        DETACH_PRESS: 'detached'
                    }
                },
                detached: {
                    on: {
                        ATTACH_PRESS: 'attached'
                    }
                }
            }
        }
    }
})
