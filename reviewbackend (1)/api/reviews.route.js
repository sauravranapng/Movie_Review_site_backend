import express from "express"
import ReviewsCtrl from "./reviews.controller.js"
const router=express.Router()

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id").get(ReviewsCtrl.apiGetReview)
router.route("/:id").put(ReviewsCtrl.apiUpdateReview)
router.route("/:id").delete(ReviewsCtrl.apiDeleteReview)
export default router