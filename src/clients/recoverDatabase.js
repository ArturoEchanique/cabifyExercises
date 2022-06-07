
export default async (dbToRecover, backupDb) => {

    try {
        let backedUpData = await backupDb.find({ backedUp: false })
        console.log("we have the backedupdata", backedUpData)
        backedUpData = backedUpData.map(elem => {
            return {
                destination: elem.destination,
                body: elem.body,
                status: elem.status,
                backedUp: true
            }
        })
        console.log("data maped",backedUpData)
        await dbToRecover.create(backedUpData)
        console.log("data refilled")
    }
    catch {
        console.log("could not refill data")
    }
}
