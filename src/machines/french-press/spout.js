import { Machine, sendParent } from 'xstate';

export default Machine({
    id: 'spout',
    initial: 'open',
    states: {
        open: {
            on: {
                OPEN: {
                    target: 'open',
                    actions: [
                        sendParent('SPOUT_OPENED')
                    ]
                },
                CLOSE: {
                    target: 'closed',
                    actions: [
                        sendParent('SPOUT_CLOSED')
                    ]
                }
            }
        },
        closed: {
            on: {
                OPEN: {
                    target: 'open',
                    actions: [
                        sendParent('SPOUT_OPENED')
                    ]
                },
                CLOSE: {
                    target: 'closed',
                    actions: [
                        sendParent('SPOUT_CLOSED')
                    ]
                }
            }
        }
    }
})
