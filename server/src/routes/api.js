import express from 'express';
import * as UserController from '../controller/UserController.js'
import * as RecruiterController from '../controller/RecruiterController.js'
import * as JobController from '../controller/JobController.js'
import AuthVerification from '../middlewares/AuthVerification.js'
import upload from '../config/multer.js';
const router = express.Router();

// User login
router.post('/registration', UserController.UserRegistration)
router.post('/login', UserController.UserLogin)
router.get('/user-data',AuthVerification,UserController.ReadUserData)

// User Job apply, job applied and update resume
router.post('/apply-job',AuthVerification,UserController.applyForJob)
router.get('/applications',AuthVerification,UserController.getUserJobApplication)
router.post('/update-resume',AuthVerification,upload.single("resume"),UserController.UpdateUserResume)


// Recruiter login
router.post('/recruiter-register',upload.single("image"),RecruiterController.RecruiterRegistration)
router.post('/recruiter-login',RecruiterController.RecruiterLogin)
router.post('/recruiter-logout',RecruiterController.RecruiterLogout)

//Recruiter or Company Data, add new job, applicants
router.get('/company',AuthVerification,RecruiterController.ReadRecruiterData)

router.post('/add-new-job',AuthVerification,RecruiterController.AddNewJob)
router.get('/applicants',AuthVerification,RecruiterController.GetJobApplicants)

//Recruiter posted jobs
router.get('/company-jobs',AuthVerification,RecruiterController.GetRecruiterPostedJob)

// Change job status and job applications visibility by recruiter 
router.post('/change-status',AuthVerification,RecruiterController.ChangeJobApplicationsStatus)
router.post('/change-visibility',AuthVerification,RecruiterController.ChangeJobVisibility)

// Route to get all Jobs and Single Job details 
router.get('/jobs',JobController.AllJobs)
router.get('/jobs/:id',JobController.SingleJobDetails)




export default router;