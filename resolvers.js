import {
    populateDataBaseWithStandardBrincesses,
    mapValuesAsArray,
    pickTwoRandomSpellsForBrincess
} from './resolversHelperFunctions.js'
import crypto from 'crypto'

const MAXIMUM_BRINCESSES_IN_DATA_BASE = 25

// Initialize dataBase
const dataBaseMap = new Map()
populateDataBaseWithStandardBrincesses(dataBaseMap)
let dataBaseArray = mapValuesAsArray(dataBaseMap)

setInterval(() => {
    dataBaseMap.clear()
    populateDataBaseWithStandardBrincesses(dataBaseMap)
    dataBaseArray = mapValuesAsArray(dataBaseMap)
}, 1200000)

export const resolvers = {
    brincesses: () => {
        return dataBaseArray
    },

    brincess: ({ id }) => {
        const brincess = dataBaseMap.get(id)
        if (!brincess) throw new Error(`Brincess not found`)
        return brincess
    },

    numberOfBrincessesInDataBase: () => {
        return dataBaseMap.size
    },

    authorOfBrincess({ id, authorId }) {
        const brincess = dataBaseMap.get(id)
        if (!brincess) throw new Error(`Brincess not found`)
        return brincess.authorId === authorId
    },

    addBrincess: ({ brincessInput }) => {
        // TODO add brincessInput values validation function

        // Remove fist brincess if dataBase is full
        if (dataBaseMap.size >= MAXIMUM_BRINCESSES_IN_DATA_BASE)
            dataBaseMap.delete(dataBaseMap.keys().next().value)

        const uuid = crypto.randomUUID()
        brincessInput.creationTimeStamp = Date.now()
        brincessInput.id = uuid
        brincessInput.spells = pickTwoRandomSpellsForBrincess()

        dataBaseMap.set(uuid, brincessInput)
        dataBaseArray = mapValuesAsArray(dataBaseMap)

        return dataBaseMap.get(uuid)
    },

    editBrincess: ({ brincessInput }) => {
        // TODO add brincessInput values validation function

        if (!brincessInput.authorId) throw new Error('No authorId provided')
        if (!brincessInput.id) throw new Error('No id provided')
        const brincess = dataBaseMap.get(brincessInput.id)
        if (!brincess) throw new Error('Brincess not found')
        if (brincess.authorId !== brincessInput.authorId)
            throw new Error('You do not have permission to edit this Brincess')

        dataBaseMap.set(brincessInput.id, brincessInput)
        dataBaseArray = mapValuesAsArray(dataBaseMap)
        return brincessInput
    },

    clearDataBase: () => {
        dataBaseMap.clear()
        populateDataBaseWithStandardBrincesses(dataBaseMap)
        dataBaseArray = mapValuesAsArray(dataBaseMap)
        return dataBaseArray
    },

    // Deprecated
    hello: () => {
        return 'Hello World!'
    }
}
