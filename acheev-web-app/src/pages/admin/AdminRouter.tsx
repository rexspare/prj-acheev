import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminDashboard } from './AdminDashboard';
import { AdminRoutes } from 'shared/Routes';
import { AdminUsers } from './AdminUsers';
import { AdminPrograms } from './adminPrograms';
import 'react-edit-text/dist/index.css';
import 'react-toggle/style.css'
import { AdminProgramFacet } from './adminProgramFacet';
import { AdminWorkout } from './adminWorkout';
import { AdminFeedback } from './adminFeedback';
import { AdminRatings } from './adminRatings';
import { AdminList } from './adminList';
import { AdminUploadFile } from './adminUploadFile';
// import { AdminCompletedSets } from './adminCompletedSets';
import { AdminCompletedWorkouts } from './adminCompletedWorkouts';

interface IProps {
  match?: any;
}

export const AdminRouter: React.FC<IProps> = ({ match }: IProps) => {
  console.log("admin router");
  return (
    <AdminSidebar match={match}>
      <Routes>
        <Route path={AdminRoutes.USERS} element={<AdminUsers />} />
        <Route path={AdminRoutes.PROGRAMS} element={<AdminPrograms />} />
        <Route path={AdminRoutes.FEEDBACK} element={<AdminFeedback />} />
        <Route path={AdminRoutes.RATINGS} element={<AdminRatings />} />
        <Route path={AdminRoutes.FACET} element={<AdminProgramFacet />} />
        <Route path={AdminRoutes.WORKOUT} element={<AdminWorkout />} />
        <Route path={AdminRoutes.ADMINS} element={<AdminList />} />
        <Route path={AdminRoutes.UPLOAD} element={<AdminUploadFile />} />
        {/* <Route path={AdminRoutes.COMPLETED_SETS} element={<AdminCompletedSets />} /> */}
        <Route path={AdminRoutes.COMPLETED_WORKOUTS} element={<AdminCompletedWorkouts />} />
        <Route path={''} element={<AdminDashboard />} />
      </Routes>
    </AdminSidebar>
  )
}
