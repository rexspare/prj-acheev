import React, { ReactNode } from 'react';
import { Sidebar } from 'components/Sidebar';
import { Navbar } from 'components/Navbar';
import { NavbarLink } from 'components/NavbarLink';
import { AdminRoutes } from 'shared/Routes';
import { AuthContext } from 'shared/Authentication';

interface IProps {
  children?: ReactNode | ReactNode[];
  match?: any;
}

export const AdminSidebar: React.FC<IProps> = ({ children, match }: IProps) => {
  const { currentUser } = React.useContext(AuthContext)

  return (
    <div id='wrapper'>
      <Sidebar>

        <NavbarLink label='Dashboard' active faIcon='tachometer-alt' route={AdminRoutes.HOME} />

        <hr className="sidebar-divider" />
        {!currentUser?.restrictedAdmin &&
          <NavbarLink label='Users' active faIcon='user' route={AdminRoutes.USERS} />
        }
        {!currentUser?.restrictedAdmin &&
          <NavbarLink label='Admins' active faIcon='user' route={AdminRoutes.ADMINS} />
        }
        <NavbarLink label='Programs' active faIcon='anchor' route={AdminRoutes.PROGRAMS} />

        {/* <NavbarLink label='Completed Workouts' active faIcon='check' route={AdminRoutes.COMPLETED_SETS} /> */}
        <NavbarLink label='Completed Workouts' active faIcon='check' route={AdminRoutes.COMPLETED_WORKOUTS} />

        <NavbarLink label='Ratings' active faIcon='info-circle' route={AdminRoutes.RATINGS} />

        <NavbarLink label='Feedback' active faIcon='info' route={AdminRoutes.FEEDBACK} />

        <NavbarLink label='Upload File' active faIcon='upload' route={AdminRoutes.UPLOAD} />

      </Sidebar>

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar match={match} />

          <div className="container-fluid">
            {children}
          </div>
        </div>
      </div>
    </div >
  )
}
