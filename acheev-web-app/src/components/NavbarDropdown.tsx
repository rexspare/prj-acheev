import React, { ReactNode } from 'react';
import { snakeCase } from 'lodash'

interface IProps {
  label: string;
  faIcon?: string;
  children?: ReactNode | ReactNode[]
}

export const NavbarDropdown: React.FC<IProps> = ({ label, faIcon, children }: IProps) => {
  const collapseName = `collapse${snakeCase(label)}`;
  return (
    <li className="nav-item">
      <a className="nav-link collapsed" href="#hi"
        data-toggle="collapse"
        data-target={`#${collapseName}`}
        aria-expanded="true"
        aria-controls={`${collapseName}`}
      >
        <i className={`fas fa-fw fa-${faIcon}`}></i>
        <span>{label}</span>
      </a>
      <div id={`${collapseName}`} className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          {children}
        </div>
      </div>
    </li>
  )
}

