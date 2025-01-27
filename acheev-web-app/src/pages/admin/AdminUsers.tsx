import React from 'react';
import { PageHeader } from 'components/PageHeader';
import gql from 'graphql-tag';
import { TableContainer } from "shared/CommonStyles";
import { AdminModifyUserInput, Pagination, useAdminChangePasswordMutation, useAdminMetricsQuery, useAdminModifyUserMutation, useAdminUsersQuery } from 'types/gqlReactTypings.generated.d';
import { orderBy } from 'lodash';
import { GqlQueryRender } from 'shared/gql/gqlQueryRender';
import { TableWrapper } from 'shared/tableWrapper';
import { formatDate } from 'shared/Utilities';
import { AdminPaginator } from './components/adminPaginator';
import AppInput, { InputType } from 'components/AppInput';
import { EditText } from 'react-edit-text';

interface IProps {
  match?: any;
}

gql`
  query AdminUsers($pagination: Pagination) {
    adminUsers(pagination: $pagination) {
      id
      email
      phoneNumber
      fullName
      firstName
      lastName
      admin
      restrictedAdmin
      isCoach
      verified
      createdAt
    }
  }

  mutation AdminChangePassword($userId: String!, $newPassword: String!) {
    adminChangePassword(userId: $userId, newPassword: $newPassword)
  }
`

export const AdminUsers: React.FC<IProps> = () => {
  const [pagination, setPagination] = React.useState<Pagination>();
  const usersQuery = useAdminUsersQuery({ variables: { pagination: { ...pagination, limit: 200 } } });
  const adminMetricsQuery = useAdminMetricsQuery();
  const [changePasswordMutation] = useAdminChangePasswordMutation();
  const [modifyAdminUser] = useAdminModifyUserMutation();

  const modifyField = (field: keyof AdminModifyUserInput, userId: string) => (value: string | number | boolean | Date) => {
    modifyAdminUser({ variables: { userId, modifyUserInput: { [field]: value } } })
      .catch(err => {
        console.error(err);
        window.alert("Failed to update value");
      })
  }


  return (
    <>
      <PageHeader title={`Users (${adminMetricsQuery.data?.adminMetrics.userCount ?? '-'} total)`} rightItem={<AdminPaginator searchTerm='Users' pagination={pagination} onChange={setPagination} />} />
      <TableContainer>
        <TableWrapper columns={[
          'ID',
          'First Name',
          'Last Name',
          'Email',
          'Phone',
          'Change Password',
          'Verified?',
          'Is Coach?',
          'Created At',
          'Actions'
        ]}>
          <GqlQueryRender query={usersQuery}>
            {({ adminUsers }) => {
              return (
                <tbody>
                  {orderBy(adminUsers, item => item.fullName, 'asc')
                    .map(user => {
                      return (
                        <tr key={user.id}>
                          <td style={{ maxWidth: 200, wordWrap: 'break-word' }}>{user.id}</td>
                          <td>
                            <EditText style={{ minWidth: 75 }} defaultValue={user.firstName} onSave={({ value }) => modifyField('firstName', user.id)(value)} />
                          </td>
                          <td>
                            <EditText style={{ minWidth: 75 }} defaultValue={user.lastName} onSave={({ value }) => modifyField('lastName', user.id)(value)} />
                          </td>
                          <td>
                            <EditText type='email' style={{ minWidth: 75 }} defaultValue={user.email} onSave={({ value }) => modifyField('email', user.id)(value)} />
                          </td>
                          <td>
                            <EditText type='tel' style={{ minWidth: 75 }} defaultValue={user.phoneNumber} onSave={({ value }) => modifyField('phoneNumber', user.id)(value)} />
                          </td>
                          <td>
                            <EditText type='password' style={{ minWidth: 75 }}
                              placeholder='New Password'
                              showEditButton={true}
                              inline={false}
                              onSave={({ value }) => changePasswordMutation({ variables: { userId: user.id, newPassword: value } }).catch(err => {
                                console.error(err);
                                window.alert("Failed to change password");
                              })} />
                          </td>
                          <td>
                            <AppInput
                              type={InputType.TOGGLE} defaultValue={user.verified}
                              onChange={modifyField('verified', user.id)} />
                          </td>
                          <td>
                            <AppInput
                              type={InputType.TOGGLE} defaultValue={user.isCoach}
                              onChange={modifyField('isCoach', user.id)} />
                          </td>
                          <td>{formatDate(user.createdAt)}</td>
                        </tr>
                      )
                    })}
                </tbody>
              )
            }}
          </GqlQueryRender>
        </TableWrapper>
      </TableContainer>
    </>
  );
}
