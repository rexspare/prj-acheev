import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from 'shared/Constants';
import { AdminRoutes } from 'shared/Routes';

const SidebarBrand = styled.div`
  padding: 21px 0;
`;

// const Logo = styled.img`
//   margin-right: 10px;
//   height: 46px;
//   width: 46px;
// `;

const LogoText = styled.div`
  color: ${Colors.WHITE};
  font-size: 26px;
  font-weight: bold;
  line-height: 23.4px;
  text-align: left;
  text-transform: lowercase;
  
  p {
    font-weight: lighter;
    margin: 0;
  }
`;

interface IProps {
  children?: ReactNode | ReactNode[]
}
export const Sidebar: React.FC<IProps> = ({ children }: IProps) => {

  return (
    <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style={{ backgroundColor: Colors.BLUE }}>

      <SidebarBrand>
        <Link to={AdminRoutes.HOME} className="sidebar-brand d-flex align-items-center" >
          <LogoText>
            Acheev<br />
            <p>admin</p>
          </LogoText>
        </Link>
      </SidebarBrand>

      <hr className="sidebar-divider my-0" />

      {children}

      <hr className="sidebar-divider d-none d-md-block" />

      {/* <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div> */}
    </ul>
  )
}