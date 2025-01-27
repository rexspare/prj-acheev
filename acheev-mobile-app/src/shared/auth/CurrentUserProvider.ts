import React, { useEffect, useContext } from 'react';
import { AuthContext } from './Authentication';
import { useMeLazyQuery } from '../../types/gqlReactTypings.generated.d';
import ObjectHash from 'object-hash';

interface IProps {
  token: string | undefined;
  currentUserRefreshTimestamp?: number;
}

export const CurrentUserProvider: React.FC<IProps> = ({ token, currentUserRefreshTimestamp }: IProps) => {
  const { signOut, setCurrentUser } = useContext(AuthContext);
  const [meQuery, { data, refetch },] = useMeLazyQuery();

  useEffect(() => {
    console.log("Triggering use effect for currentUserRefreshTimestamp: ", currentUserRefreshTimestamp)
    if ((currentUserRefreshTimestamp ?? 0) > 0) {
      refetch().catch(console.info);
    }
  }, [currentUserRefreshTimestamp]);

  const log = (val: string) => {
    console.log(`[CurrentUserProvider] ${val}`);
  }

  useEffect(() => {
    if (!!token) {
      log("Token detected.  Fetching current user");
      meQuery();
    }
  }, [token]);

  useEffect(() => {
    if (!!data) {
      const { me } = data;
      log(`Data returned for current user: ${me?.user.fullName}`);

      if (!!me) {
        log(`Setting current user: ${JSON.stringify(me)}`);
        setCurrentUser(me.user);
      } else {
        signOut();
      }
    }
  }, [ObjectHash(data?.me ?? {})]);

  return null;
}