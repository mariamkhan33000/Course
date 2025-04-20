import express from 'express'
import { buyCourse, courseDetails, createCourse, deleteCourse, getAllCourses, getPurchasedCourses, updateCourse } from '../controllers/courseController.js'
import { get } from 'mongoose'
import { authMiddleware } from '../middlewares/userMiddleware.js'
const router = express.Router()

router.post('/create', createCourse)
router.put('/update/:courseId', updateCourse)
router.delete('/delete/:courseId', deleteCourse)
router.get('/courses', getAllCourses)
router .get('/:courseId', courseDetails)
router.post('/buy/:courseId',authMiddleware ,buyCourse)
router.get('/getcourse', getPurchasedCourses)


export default router;