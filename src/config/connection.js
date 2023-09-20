import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const config = JSON.parse(process.env.DB)

const uri = `mongodb+srv://${config.ATLAS_USER}:${config.ATLAS_PASSWORD}@${config.ATLAS_CLUSTER}.mongodb.net`

let client = null

const mongoConn = async () => {
  try {
    const options = {
      wtimeout: 2500,
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    client = await MongoClient.connect(uri, options)
    return client
  } catch (error) {
    console.log(error)
  }
}

const getDB = (dbname) => {
  return client?.db(dbname)
}

export { mongoConn, getDB }