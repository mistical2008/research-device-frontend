import { pipe } from 'fp-ts/function'
import { readFile } from 'fs/promises'

function logStart(): void {
    console.log(`TEST STARTED`)
}

function logStop(): void {
    console.log(`TEST FINISHED`)
}

async function renderHtml(reply: any, path: string): Promise<void> {
    const data = await readFile(path, 'utf8')
    reply.header('content-type', 'text/html; charset=utf-8')
    reply.send(data)
}

function genRandFloat(min: number = 0, max: number = 1) {
    return () => Math.random() * (max - min) + min
}

function timerToInt(timer: NodeJS.Timer): number {
    return timer[Symbol.toPrimitive]()
}

function stopTimer(timerObj: NodeJS.Timer): () => void {
    return () => {
        pipe(timerObj, timerToInt, clearInterval)
    }
}

function runOnInterval({
    interval,
    run = console.log,
}: {
    interval: number
    run: (timerObject: NodeJS.Timer) => void
}): NodeJS.Timer {
    const timerObj = setInterval(() => {
        run(timerObj)
    }, interval)

    // @ts-ignore
    return stopTimer(timerObj)
}

function emitData(msg: string = 'msg/data', socket: any, data: any) {
    socket.emit(msg, data)
}

export {
    genRandFloat,
    timerToInt,
    stopTimer,
    runOnInterval,
    logStart,
    logStop,
    emitData,
    renderHtml,
}
