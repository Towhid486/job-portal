import express from 'express';
import * as UserController from '../controller/UserController.js'
import * as RecruiterController from '../controller/RecruiterController.js'
import * as JobController from '../controller/JobController.js'
import AuthVerification from '../middlewares/AuthVerification.js'
import upload from '../config/multer.js';
const router = express.Router();

// User login
router.post('/google-login',UserController.FirebaseLogin)
router.post('/registration',upload.single("image"),UserController.UserRegistration)
router.post('/login', UserController.UserLogin)
router.post('/logout', UserController.UserLogout)
router.get('/user-data',AuthVerification,UserController.ReadUserData)
router.post('/update-user-profile',AuthVerification,upload.single("image"),UserController.UpdateUserProfile)
router.post('/update-resume',AuthVerification,upload.single("resume"),UserController.UpdateUserResume)

// User Job apply, job applied, already applied.
router.post('/apply-job',AuthVerification,UserController.applyForJob)
router.get('/isApplied/:jobId',AuthVerification,UserController.alreadyApplied)
router.get('/applications',AuthVerification,UserController.getUserJobApplication)


// Recruiter login
router.post('/recruiter-google-login',RecruiterController.RecruiterFirebaseLogin)
router.post('/recruiter-register',upload.single("image"),RecruiterController.RecruiterRegistration)
router.post('/recruiter-login',RecruiterController.RecruiterLogin)
router.post('/recruiter-logout',RecruiterController.RecruiterLogout)

//Recruiter or Company Data, update profile, add new job, applicants
router.get('/company',AuthVerification,RecruiterController.ReadRecruiterData)
router.post('/update-recruiter-profile',AuthVerification,upload.single("image"),RecruiterController.UpdateRecruiterProfile)

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