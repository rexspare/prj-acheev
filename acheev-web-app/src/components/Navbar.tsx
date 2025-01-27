import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminRoutes } from 'shared/Routes';
import { AuthContext } from 'shared/Authentication';

interface IProps {
  match?: any;
}
export const Navbar: React.FC<IProps> = ({ match }: IProps) => {
  const { currentUser, signOut } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>

      {/* <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form> */}

      <ul className="navbar-nav ml-auto">

        <li className="nav-item dropdown no-arrow d-sm-none">
          <a className="nav-link dropdown-toggle" href="#hi" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-search fa-fw"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
            {/* <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form> */}
          </div>
        </li>

        {2 + 2 === 5 &&
          <>
            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#hi" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-bell fa-fw"></i>
                <span className="badge badge-danger badge-counter">3+</span>
              </a>
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">
                  Alerts Center
                </h6>
                <a className="dropdown-item d-flex align-items-center" href="#hi">
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 12, 2019</div>
                    <span className="font-weight-bold">A new monthly report is ready to download!</span>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#hi">
                  <div className="mr-3">
                    <div className="icon-circle bg-success">
                      <i className="fas fa-donate text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 7, 2019</div>
                  $290.29 has been deposited into your account!
                  </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#hi">Show All Alerts</a>
              </div>
            </li>

            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#hi" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-envelope fa-fw"></i>
                <span className="badge badge-danger badge-counter">7</span>
              </a>
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                <h6 className="dropdown-header">
                  Message Center
                </h6>
                <a className="dropdown-item d-flex align-items-center" href="#hi">
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="Dropdown" />
                    <div className="status-indicator bg-success"></div>
                  </div>
                  <div className="font-weight-bold">
                    <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                    <div className="small text-gray-500">Emily Fowler · 58m</div>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#hi">
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="Dropdown" />
                    <div className="status-indicator"></div>
                  </div>
                  <div>
                    <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                    <div className="small text-gray-500">Jae Chun · 1d</div>
                  </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#hi">Read More Messages</a>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block" />
          </>
        }

        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#hi" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{currentUser?.fullName}</span>
            {/* <img /**className="img-profile rounded-circle"/ style={{ objectFit: 'contain', height: '2rem' }} alt='Brand logo' src={currentUser?.imageUrl} /> */}
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            {2 + 2 === 5 && <Link to={AdminRoutes.HOME} className="dropdown-item" >
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Settings
            </Link>
            }

            {/* <div className="dropdown-divider"></div> */}
            <a onClick={signOut} className="dropdown-item">
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  )
}