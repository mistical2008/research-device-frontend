import fastify from 'fastify'
import fastifyIO from 'fastify-socket.io'
import path from 'path'
import {
    emitData,
    genRandFloat,
    isClient,
    isTestStart,
    isTestStop,
    logStart,
    logStop,
    renderHtml,
    runOnInterval,
    stopTimer,
    timerToInt,
} from './lib/utils'
import 'dotenv/config'
import { nanoid } from 'nanoid'
import { NanoId, SocketIOType } from '@app/types'

const port = process.env.BACKEND_PORT || 3000
const server = fastify()
const genRandFload10to100 = genRandFloat(10, 100)

server.register(fastifyIO, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
    },
})

function sendSensorsData(socket: SocketIOType, sensorId: NanoId): void {
    emitData(socket, 'message', {
        payload: {
            sensorId,
            timestamp: Date.now(),
            value: genRandFload10to100(),
        },
        cmd: 'data',
        source: 'server',
    })
}
server.get('/server-test', (_req, reply) => {
    server.io.emit('hello')

    console.log('hello')
    renderHtml(reply, path.resolve(__dirname, './index.html'))
})

server.ready().then(() => {
    server.io.on('connection', (socket) => {
        const clearTimerFns: ReturnType<typeof stopTimer>[] = []
        const intervals = [1500, 2000]

        socket.emit('msg/server/connect', {
            id: socket.id,
            timestamp: Date.now(),
        })

        socket.on('message', ({ cmd, source }) => {
            if (isClient(source) && isTestStop(cmd)) {
                clearTimerFns.forEach((clearTimer) => {
                    clearTimer()
                })
                clearTimerFns.length = 0
                logStop()
            }
            if (isClient(source) && isTestStart(cmd)) {
                logStart()

                intervals.forEach((interval) => {
                    const sensorId = nanoid()

                    const clearTimerFn = runOnInterval({
                        run: (_timerObj) => {
                            sendSensorsData(socket, sensorId)
                            console.log({ timer: timerToInt(_timerObj) })
                        },
                        interval,
                    })
                    clearTimerFns.push(clearTimerFn)
                })
            }
        })

        socket.on('msg/client', (cmd) => {
            console.log('msg/client', cmd)
        })
    })

    server.io.on('disconnect', (socket) => {
        console.log('disconnect')

        socket.emit('msg/server/disconnect', {
            id: socket.id,
            timestamp: Date.now(),
        })
    })
})

server.listen(port, () => console.log(`server listening on ${port}`))
