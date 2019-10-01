import { Machine } from 'xstate';

export default Machine({
    id: 'spout',
    initial: 'closed',
    states: {
        open: {
            on: {
                CLOSE: 'closed'
            }
        },
        closed: {
            on: {
                OPEN: 'open'
            }
        }
    }
})