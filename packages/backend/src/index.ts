import fastify from 'fastify'
import fastifyIO from 'fastify-socket.io'
import path from 'path'
import {
    emitData,
    genRandFloat,
    logStart,
    logStop,
    renderHtml,
    runOnInterval,
    stopTimer,
    timerToInt,
} from './lib/utils'
import 'dotenv/config'

const port = process.env.BACKEND_PORT || 3000
const server = fastify()
const genRandFload10to100 = genRandFloat(10, 100)
server.register(fastifyIO)

function sendSensorsData(socket: any): void {
    emitData('msg/server/send', socket, {
        id: socket.id,
        timestamp: Date.now(),
        value: genRandFload10to100(),
    })
}
server.get('/server-test', (req, reply) => {
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

        socket.on('test/start', (data) => {
            socket.emit('test/start', data)
            logStart()

            console.log({ intervals })
            intervals.forEach((interval) => {
                console.log({ interval })
                const clearTimerFn = runOnInterval({
                    run: (_timerObj) => {
                        sendSensorsData(socket)
                        console.log({ timer: timerToInt(_timerObj) })
                    },
                    interval,
                })
                clearTimerFns.push(clearTimerFn)
            })
        })

        socket.on('test/stop', (_data) => {
            clearTimerFns.forEach((clearTimer) => {
                clearTimer()
            })
            socket.emit('test/stop')
            logStop()
        })

        socket.on('msg/client/send', (data) => {
            console.log('msg/client/send', data)
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
