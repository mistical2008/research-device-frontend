import { atom, selector } from 'recoil'

import consoleConf from 'shared/config/console'

import { WebsocketMessage } from '@app/types'

type ExperimentStatus = 'idle' | 'started' | 'stopped'

const status = atom<ExperimentStatus>({
    key: 'status',
    default: 'idle',
    effects: [
        ({ onSet }) => {
            onSet((status) => {
                console.debug(
                    '%cCurrent status:',
                    consoleConf.styles.stateActions.experiment.status,
                    status
                )
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

const experimentDataset = atom<WebsocketMessage['payload'][]>({
    key: 'dataset',
    default: [],
    effects: [
        ({ onSet }) => {
            onSet((data) => {
                console.debug(
                    '%cDATASET: %o',
                    consoleConf.styles.stateActions.experiment.dataset,
                    data
                )
            })
        },
    ],
})

const datasetBySensors = selector({
    key: 'datasetBySensors',
    get: ({ get }) => {
        const dataset = get(experimentDataset)
        const sensors = dataset
            .map((payload) => payload?.sensorId)
            .filter(Boolean)

        return sensors.reduce((acc, id) => {
            // @ts-expect-error
            acc[id] = dataset.filter(({ sensorId }) => id === sensorId)
            return acc
        }, {})
    },
})

export { status, isStarted, experimentDataset, datasetBySensors }
