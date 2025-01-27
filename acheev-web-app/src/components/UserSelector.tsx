import React from 'react';
import { GqlQueryRender } from 'shared/gql/gqlQueryRender';
import { AdminUsersQuery, useAdminUsersQuery } from 'types/gqlReactTypings.generated.d';
import AppInput, { InputType } from './AppInput';

interface IProps {
  onUserChanged: (user: AdminUsersQuery['adminUsers'][0]) => void
  placeholder?: string
}


export const UserSelector: React.FC<IProps> = ({ onUserChanged }: IProps) => {
  const usersQuery = useAdminUsersQuery();

  return (
    <GqlQueryRender
      query={usersQuery}>
      {({ adminUsers: users }) => {
        const searchable_users = users.map(user => ({ label: `${user.fullName} (${user.id})`, value: user.id }));

        const handleOnChange = (userId: string) => {
          const user = users.find(item => item.id === userId);
          if (user != null) {
            onUserChanged(user);
          }
        }

        return (
          <AppInput
            type={InputType.AUTOCOMPLETE}
            autocompleteItems={searchable_users}
            onChange={handleOnChange}
            label='User'
            placeholder='User search (by name)'
          />
        );
      }}
    </GqlQueryRender>
  )
}