import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const BACKEND_PORT = process.env.BACKEND_PORT;

connectToDatabase()
    .then(()=>{
        app.listen(BACKEND_PORT, () => console.log("Listening on port 5000 & Connect to Database"));
    })
    .catch((error) => {
        console.log(error);
    })



