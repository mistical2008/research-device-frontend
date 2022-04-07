import { createRxDatabase } from 'rxdb/plugins/core'
import { RxStorageLokiStatics } from 'rxdb/plugins/lokijs'
import { getRxStorageWorker } from 'rxdb/plugins/worker'

const database = await createRxDatabase({
    name: 'mydatabase',
    storage: getRxStorageWorker({
        statics: RxStorageLokiStatics,
        /**
         * Path to where the copied file from node_modules/rxdb/dist/workers
         * is reachable from the webserver.
         */
        workerInput: '/lokijs-incremental-indexeddb.worker.js',
    }),
})

const datasetSchema = {
    title: 'dataset schema',
    version: 0,
    type: 'object',
    description: 'A dataset schema',
    primaryKey: 'timestamp',
    properties: {
        sensorId: {
            type: 'string',
            description: 'The unique id of the sensor',
        },
        timestamp: {
            type: 'integer',
            description: 'timestamp of the measurement',
        },
        value: {
            type: 'number',
            description: 'float number value',
        },
    },
    required: ['sensorId', 'timestamp', 'value'],
}

const datasetsCollection = await database.addCollections({
    sensors: {
        schema: datasetSchema,
    },
})
console.dir(database.collections.sensors.name)

await datasetsCollection.sensors.insert({
    sensoId: 'sensor1',
    timestamp: 1,
    value: 1.03,
})
console.dir(datasetsCollection.sensors.exportJSON())
