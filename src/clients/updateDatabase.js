
export default (dbToUpdate, backupDb) => {

    try {
        backedUpData = await backupDb.find({ backedUp: false })
        await dbToUpdate.create(backedUpData)
    }
    catch {
        console.log("could not update database")
    }
}
