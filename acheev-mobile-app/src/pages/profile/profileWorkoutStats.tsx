import React from 'react';
import { SafeView } from '../../shared/components/SafeView';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { AuthContext } from '../../shared/auth/Authentication';

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

export const ProfileWorkoutStats: React.FC<Props> = ({ route, navigation }: Props) => {
  const { currentUser, refreshCurrentUser, signOut } = React.useContext(AuthContext);

  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 10,
      }}>

      </SafeView>
    </>
  );
}