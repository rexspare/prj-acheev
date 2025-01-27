import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

interface IProps {
  label: string;
  active?: boolean;
  faIcon?: string;
  route?: string;
  link?: string;

}

export const NavbarLink: React.FC<IProps> = ({ label, active, faIcon, route, link }: IProps) => {

  const content = <>
    {faIcon && <i className={`fas fa-fw fa-${faIcon}`} />}
    <span>{label}</span>
  </>;

  return (
    <li className={classnames('nav-item', { 'active': active })}>
      {route ?
        <Link to={route} className="nav-link">
          {content}
        </Link>
        :
        <a href={link} className="nav-link" target='_blank' rel="noopener noreferrer">
          {content}
        </a>
      }
    </li>
  )
}