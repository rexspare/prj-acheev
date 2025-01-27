import React from 'react';
import { AuthContext } from 'shared/Authentication';
import { GeneralRoutes } from 'shared/Routes';
import { Navigate } from 'react-router';

export const Logout: React.FC = () => {
  const { signOut } = React.useContext(AuthContext);
  const [loggedOut, setLoggedOut] = React.useState<boolean>();

  React.useEffect(() => {
    signOut()
    setTimeout(() => setLoggedOut(true), 500);
  }, [])

  if (!loggedOut) {
    return null;
  }

  return (
    <Navigate replace to={GeneralRoutes.LOGIN} />
  );
}