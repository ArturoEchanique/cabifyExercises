
export default async (dbToRecover, backupDb) => {

    try {
        let backedUpData = await backupDb.find({ backedUp: false })
        backedUpData = backedUpData.map(elem => {
            return {
                destination: elem.destination,
                body: elem.body,
                status: elem.status,
                backedUp: true
            }
        })
        await dbToRecover.create(backedUpData)
        console.log("data refilled")
    }
    catch {
        console.log("could not refill data")
    }
}
