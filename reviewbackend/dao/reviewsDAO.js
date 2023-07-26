import mongodb from "mongodb"
const  ObjectId = mongodb.ObjectId


let reviews

 export default class ReviewsDAO{
   static async injectDB(conn){
      if(reviews){return}
      try{
       reviews=await conn.db("reviews").collection("reviews")
        }
           catch(e){
       console.error(`Unable to establish collection 
             handles in userDAO: ${e}`)
     }
   }

   static async addReview(movieId,user,review,email){
     try{ const reviewDoc={
                   movieId:movieId,
                    user:user,
       review:review,
       email:email,
              }
         return await reviews.insertOne(reviewDoc)
         //insertOne is mongodb command to insert
        }
     catch(e){
       console.error(`Unable to post review:${e}`)
       return {error:e}
        }
       }

   static async getReview(reviewId){
     try{
       return await reviews.findOne({_id: new ObjectId(reviewId)})
       // _id is generated unique id for each entry in database but we do not know that hence we are using _id:ObjectId(reviewId) to find _id from reviewId provided by client
     }
     catch(e){
       console.error(`Unable to get review:${e}`)
       return {error:e}
     }
   }
  static async updateReview(reviewId,user,review){
    try{
      const updateResponse=await reviews.updateOne(
        {_id: new ObjectId(reviewId)},
        {$set:{user:user,review:review}}
        //$set is specific to mongodb
      )
      return updateResponse
    }catch(e){
      console.error(`Unable to update review:${e}`)
      return {error:e}
    }
  }
   static async deleteReview(reviewId){
     try{
       const deleteResponse=await reviews.deleteOne({
         _id: new ObjectId(reviewId),
       })
     }
     catch(e){
       console.error(`Unable to delete review:${e}`)
       return {error:e}
     }
   }

   static async getReviewsByMovieId(movieId){
     try{
       const cursor=await reviews.find({movieId: parseInt(movieId)})
       return cursor.toArray()
       }catch(e){
       console.error(`Unable to get review:${e}`)
       return {error:e}
       }
   }
   
 }
