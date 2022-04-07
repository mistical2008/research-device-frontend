import { message } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'

import { useSession } from 'shared/api/websocket'

import {
    status,
    isStarted,
    experimentDataset,
} from 'features/experiment-runner'

import { WebsocketMessage } from '@app/types'

import { datasetBySensors } from './model'
import { DatasetBySensors } from './types'

interface StateContext {
    started: boolean
    dataset: WebsocketMessage['payload'][]
    datasetBySensors: DatasetBySensors
}

interface ActionsContext {
    start: () => void
    stop: () => void
    toggle: () => void
}

const ExperimentStateContext = React.createContext<StateContext | null>(null)
ExperimentStateContext.displayName = 'ExperimentStateContext'

const ExperimentActionsContext = React.createContext<ActionsContext | null>(
    null
)
ExperimentActionsContext.displayName = 'ExperimentActionsContext'

function ExperimentProvider({ children }: React.PropsWithChildren<{}>) {
    const setStatus = useSetRecoilState(status)
    const started = useRecoilValue(isStarted)
    const [dataset, setDataset] = useRecoilState(experimentDataset)
    const bySensors = useRecoilValue(datasetBySensors)
    const { connect, close, sendMessage } = useSession(
        () => {
            message.success('Соединение установлено')
        },
        (data) => setDataset([...dataset, data.payload]),
        () => message.warn('Соединение разорвано')
    )
    const start = () => {
        setStatus('started')
        sendMessage({ source: 'client', cmd: 'test:start' })
    }
    const stop = () => {
        setStatus('stopped')
        sendMessage({ source: 'client', cmd: 'test:stop' })
    }
    const toggle = () => {
        if (started) {
            stop()
        } else {
            start()
        }
    }

    useEffect(() => {
        connect()
        return () => {
            close()
        }
    }, [])

    const stateActions = useMemo<ActionsContext>(
        () => ({
            start,
            stop,
            toggle,
        }),
        [started, dataset]
    )
    const stateValues = useMemo<StateContext>(
        () => ({
            started,
            dataset,
            datasetBySensors: bySensors,
        }),
        [started, dataset]
    )

    return (
        <ExperimentStateContext.Provider value={stateValues}>
            <ExperimentActionsContext.Provider value={stateActions}>
                {children}
            </ExperimentActionsContext.Provider>
        </ExperimentStateContext.Provider>
    )
}

function useExperimentActions() {
    const context = React.useContext(ExperimentActionsContext)
    if (!context) {
        throw new Error(
            `hook 'useExperimentActions' must be used withing the 'ExperimentActionsContext'`
        )
    }
    return context
}

function useExperimentState() {
    const context = React.useContext(ExperimentStateContext)
    if (!context) {
        throw new Error(
            `hook 'useExperimentState' must be used withing the 'ExperimentStateContext'`
        )
    }
    return context
}

export { ExperimentProvider, useExperimentActions, useExperimentState }
