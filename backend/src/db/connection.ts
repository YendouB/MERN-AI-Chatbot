import {connect, disconnect} from "mongoose"

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to Database");
    }
    
}

async function disconnectFromDatabase () {

    try {
        await disconnect();
    } catch(error){
        console.log(error);
        throw new Error("Cannot disconnect From Database");
    }

}

export {connectToDatabase, disconnectFromDatabase};