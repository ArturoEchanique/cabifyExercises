import deleteDatabase from "../clients/deleteDatabase.js";

export default async (req, res) => {

    if (await deleteDatabase()) res.json("databaseDeleted");
    else res.json("could not delete database");

    
}
