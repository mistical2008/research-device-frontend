import { Socket } from 'socket.io-client'

import { NanoId } from 'shared/api/types'

type WebsocketServerCmd = 'data'
type WebsocketClientCmd = 'test:start' | 'test:stop'
type WebsocketCmd = WebsocketServerCmd | WebsocketClientCmd
type WebsocketMessageSource = 'server' | 'client'

type WebsocketMessagePayload = {
    id: NanoId
    timestamp: number
    value: number
}

type WebsocketMessage = {
    source: WebsocketMessageSource
    cmd: WebsocketCmd
    payload: WebsocketMessagePayload
}

type WebsocketMessageHandler = (message: WebsocketMessage) => void

interface ServerToClientEvents {
    message: WebsocketMessageHandler
}

interface ClientToServerEvents {
    message: WebsocketMessageHandler
}

type SocketIOType = Socket<ServerToClientEvents, ClientToServerEvents>

export type {
    WebsocketCmd,
    WebsocketMessage,
    WebsocketMessagePayload,
    WebsocketServerCmd,
    WebsocketClientCmd,
    WebsocketMessageHandler,
    ServerToClientEvents,
    ClientToServerEvents,
    SocketIOType,
}
