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

export { status, isStarted }
