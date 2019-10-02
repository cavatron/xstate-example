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
                            actions: [sendParent('PRESS_LOWERED')]
                        },
                        RAISE_PRESS: {
                            target: 'raised',
                            actions: [
                                sendParent('PRESS_RAISED')
                            ]
                        }
                    }
                },
                lowered: {
                    on: {
                        RAISE_PRESS: {
                            target: 'raised',
                            actions: [sendParent('PRESS_RAISED')]
                        },
                        LOWER_PRESS: {
                            target: 'lowered',
                            actions: [
                                sendParent('PRESS_LOWERED')
                            ]
                        }
                    }
                }
            }

        },
        beaker: {
            initial: 'attached',
            states: {
                attached: {
                    on: {
                        DETACH_PRESS: {
                            target: 'detached',
                            actions: [sendParent('PRESS_DETACHED')]
                        },
                        ATTACH_PRESS: {
                            target: 'attached',
                            actions: [sendParent('PRESS_ATTACHED')]
                        },
                    }
                },
                detached: {
                    on: {
                        ATTACH_PRESS: {
                            target: 'attached',
                            actions: [sendParent('PRESS_ATTACHED')]
                        },
                        DETACH_PRESS: {
                            target: 'detached',
                            actions: [sendParent('PRESS_DETACHED')]
                        }
                    }
                }
            }

        }
    }
})
