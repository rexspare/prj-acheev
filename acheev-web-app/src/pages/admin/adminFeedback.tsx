import React from 'react';
import { PageHeader } from 'components/PageHeader';
import gql from 'graphql-tag';
import { TableContainer } from "shared/CommonStyles";
import { Pagination, useAdminFeedbackQuery, } from 'types/gqlReactTypings.generated.d';
import { GqlQueryRender } from 'shared/gql/gqlQueryRender';
import { TableWrapper } from 'shared/tableWrapper';
import { formatDate } from 'shared/Utilities';
import { AdminPaginator } from './components/adminPaginator';

interface IProps {
  match?: any;
}

gql`
  query AdminFeedback($pagination: Pagination) {
    adminFeedback(pagination: $pagination) {
      id, userId, category, content, notes createdAt
    }
  }
`
export const AdminFeedback: React.FC<IProps> = () => {
  const [pagination, setPagination] = React.useState<Pagination>();
  const feedbackQuery = useAdminFeedbackQuery({ variables: { pagination: { ...pagination, limit: 200 } } });


  return (
    <>
      <PageHeader title={`Feedback`} rightItem={<AdminPaginator searchTerm='Feedback' pagination={pagination} onChange={setPagination} />} />
      <TableContainer>
        <TableWrapper columns={[
          'ID',
          'User ID',
          'Category',
          'Content',
          'Notes',
          'Created At',
        ]}>
          <GqlQueryRender query={feedbackQuery}>
            {({ adminFeedback }) => {
              return (
                <tbody>
                  {adminFeedback
                    .map(item => {
                      return (
                        <tr key={item.id}>
                          <td style={{ maxWidth: 200, wordWrap: 'break-word' }}>{item.id}</td>
                          <td>  {item.userId} </td>
                          <td>  {item.category} </td>
                          <td>  {item.content} </td>
                          <td>  {item.notes} </td>
                          <td>{formatDate(item.createdAt)}</td>
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
