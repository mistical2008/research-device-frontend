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
    timerToInt,
} from './lib/utils'
import 'dotenv/config'

const port = process.env.PORT || 3000
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
        let stopTimerOne: () => void
        let stopTimerTwo: () => void

        socket.emit('msg/server/connect', {
            id: socket.id,
            timestamp: Date.now(),
        })

        socket.on('test/start', (data) => {
            socket.emit('test/start', data)
            logStart()

            stopTimerOne = runOnInterval({
                run: (_timerObj) => {
                    sendSensorsData(socket)
                    console.log({ timer: timerToInt(_timerObj) })
                },
                interval: 1500,
            })
            stopTimerTwo = runOnInterval({
                run: (_timerObj) => {
                    sendSensorsData(socket)
                    console.log({ timer: timerToInt(_timerObj) })
                },
                interval: 2000,
            })
        })

        socket.on('test/stop', (_data) => {
            stopTimerOne()
            stopTimerTwo()
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
