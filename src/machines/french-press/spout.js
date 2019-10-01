import { Machine, sendParent } from 'xstate';

export default Machine({
    id: 'spout',
    initial: 'closed',
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
