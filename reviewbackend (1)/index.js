import app from "./server.js"
import dotenv from "dotenv"
dotenv.config();
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient=mongodb.MongoClient
//MongoCLient comes from mongodb library of javascript
const mongo_username=process.env['mongo_user']
const mongo_password=process.env['mongo_pass']
const uri=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.opxy2er.mongodb.net/?retryWrites=true&w=majority`
const port=8080
MongoClient.connect(
  uri,
  {maxPoolSize:50,
   wtimeoutMS:2500,
   useNewUrlParser:true
    
  })
  .catch(err=>{
     console.error(err.stack)
       process.exit(1)
    })
  .then(async client=>{
    await ReviewsDAO.injectDB(client)
    app.listen(port,()=>{
      console.log(`listening on  port${port}`)
    })
  })