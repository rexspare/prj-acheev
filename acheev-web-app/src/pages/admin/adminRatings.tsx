import React from 'react';
import { PageHeader } from 'components/PageHeader';
import gql from 'graphql-tag';
import { TableContainer } from "shared/CommonStyles";
import { Pagination, useAdminRatingsQuery, } from 'types/gqlReactTypings.generated.d';
import { GqlQueryRender } from 'shared/gql/gqlQueryRender';
import { TableWrapper } from 'shared/tableWrapper';
import { formatBoolean, formatDate } from 'shared/Utilities';
import { AdminPaginator } from './components/adminPaginator';

interface IProps {
  match?: any;
}

gql`
  query AdminRatings($pagination: Pagination) {
    adminRatings(pagination: $pagination) {
      id, userId, modelType, modelId, notes createdAt, ratingChallenge,  ratingChallengeScale,   ratingPerformance,  ratingPerformanceScale,   ratingEffort,  ratingEffortScale,   ratingOverall,  ratingOverallScale,  experiencedImprovement
    }
  }
`
export const AdminRatings: React.FC<IProps> = () => {
  const [pagination, setPagination] = React.useState<Pagination>();
  const ratingsQuery = useAdminRatingsQuery({ variables: { pagination: { ...pagination, limit: 200 } } });

  const renderRating = React.useCallback((value, scale) =>
    `${value ?? 'Unrated'} of ${scale}`, []);


  return (
    <>
      <PageHeader title={`Ratings`} rightItem={<AdminPaginator searchTerm='Ratings' pagination={pagination} onChange={setPagination} />} />
      <TableContainer>
        <TableWrapper columns={[
          'ID',
          'User ID',
          'Model Type',
          'Model ID',
          'Challenge',
          'Performance',
          'Effort',
          'Experienced Improvement',
          'Notes',
          'Created At',
        ]}>
          <GqlQueryRender query={ratingsQuery}>
            {({ adminRatings }) => {
              return (
                <tbody>
                  {adminRatings
                    .map(item => {
                      return (
                        <tr key={item.id}>
                          <td style={{ maxWidth: 200, wordWrap: 'break-word' }}>{item.id}</td>
                          <td>  {item.userId} </td>
                          <td>  {item.modelType} </td>
                          <td>  {item.modelId} </td>
                          <td>{renderRating(item.ratingChallenge, item.ratingChallengeScale)}</td>
                          <td>{renderRating(item.ratingPerformance, item.ratingPerformanceScale)}</td>
                          <td>{renderRating(item.ratingEffort, item.ratingEffortScale)}</td>
                          <td>  {formatBoolean(item.experiencedImprovement)} </td>
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
