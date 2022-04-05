import { atom, selector } from 'recoil'
type ExperimentStatus = 'idle' | 'started' | 'stopped'

const status = atom<ExperimentStatus>({
    key: 'status',
    default: 'idle',
    effects: [
        ({ onSet }) => {
            onSet((status) => {
                console.debug('Current status:', status)
            })
        },
    ],
})
const isStarted = selector({
    key: 'isStarted',
    get: ({ get }) => {
        const state = get(status)
        return state === 'idle' || state === 'stopped' ? false : true
    },
})

// const setStart = action(status, 'start', (status) => status.set('started'))

// const setStop = action(status, 'stop', (status) => status.set('stopped'))

// const isStarted = computed(status, (status) =>
//     status === 'idle' || status === 'stopped' ? false : true
// )

// const toggleStatus = action(status, 'toggle', (started) => {
//     if (started.get() === 'idle' || started.get() === 'stopped') {
//         setStart()
//     } else {
//         setStop()
//     }
// })

// // subscribe to the status changes and emit to WebSocket
// status.listen((status) => {
//     if (status === 'started') {
//         console.log('started')
//     } else {
//         console.log('stopped')
//     }
// })

export { status, isStarted }
