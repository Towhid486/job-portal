import React, { useContext } from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import ApplyJobPage from './pages/ApplyJobPage';
import ApplicationsPage from './pages/ApplicationsPage';
import HomePage from './pages/HomePage';
import RecruiterLogin from './components/Authorization/Recruiter/RecruiterLogin';
import { AppContext } from './context/AppContext';
import RecruiterDashBoardPage from './pages/RecruiterDashboardPage';
import AddJob from './components/Recruiter-Dashboards/AddJob';
import ManageJobs from './components/Recruiter-Dashboards/ManageJobs';
import ViewApplications from './components/Recruiter-Dashboards/ViewApplications';
const App = () => {
  const {showRecruiterLogin} = useContext(AppContext)
  return (
      <BrowserRouter>
        {showRecruiterLogin && <RecruiterLogin/>}
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/apply-job/:id' element={<ApplyJobPage/>}/>
          <Route path='/applications' element={<ApplicationsPage/>}/>
          <Route path='/dashboard' element={<RecruiterDashBoardPage/>}>
            {/* Redirect "/dashboard" to "/dashboard/view-applications" */}
            <Route index element={<Navigate to="/dashboard/view-applications" replace />} />
            <Route path='add-job' element={<AddJob/>}/>
            <Route path='manage-jobs' element={<ManageJobs/>}/>
            <Route path='view-applications' element={<ViewApplications/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;