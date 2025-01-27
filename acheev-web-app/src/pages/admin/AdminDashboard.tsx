import { MetricCard } from 'components/MetricCard';
import gql from 'graphql-tag';
import React from 'react';
import { Row } from 'react-bootstrap';
import { GqlQueryRender } from 'shared/gql/gqlQueryRender';
import { AdminRoutes } from 'shared/Routes';
import { useAdminMetricsQuery } from 'types/gqlReactTypings.generated.d';
import { PageHeader } from '../../components/PageHeader';
import { AuthContext } from 'shared/Authentication';

gql`
  query AdminMetrics {
    adminMetrics {
      userCount, ratingCount, feedbackCount
    }
  } 
`

export const AdminDashboard: React.FC = () => {
  const adminMetricsQuery = useAdminMetricsQuery();
  const { currentUser } = React.useContext(AuthContext)

  const isSuperAdmin = !!currentUser?.admin && !currentUser?.restrictedAdmin

  return (
    <div >
      <PageHeader title='Dashboard' />

      <GqlQueryRender query={adminMetricsQuery}>
        {({
          adminMetrics: { userCount, ratingCount, feedbackCount },
        }) => {

          return (
            <div>
              {!isSuperAdmin &&
                <h3>Data-entry user</h3>
              }
              {isSuperAdmin && <Row>
                <MetricCard color='success' faIcon='user' label='App Users' value={userCount} to={AdminRoutes.USERS} />
                <MetricCard color='primary' faIcon='info-circle' label='Ratings' value={ratingCount} to={AdminRoutes.RATINGS} />
                <MetricCard color='info' faIcon='info' label='Feedback' value={feedbackCount} to={AdminRoutes.FEEDBACK} />

              </Row>
              }
            </div>
          );
        }}
      </GqlQueryRender>
    </div >
  );
}
