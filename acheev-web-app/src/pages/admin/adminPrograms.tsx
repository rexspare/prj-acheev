import React from 'react';
import { PageHeader } from 'components/PageHeader';
import gql from 'graphql-tag';
import { TableContainer } from "shared/CommonStyles";
import { Pagination, ProgramInput, useCreateProgramMutation, useModifyProgramMutation, useAdminProgramsQuery } from 'types/gqlReactTypings.generated.d';
import { orderBy } from 'lodash';
import { GqlQueryRender } from 'shared/gql/gqlQueryRender';
import { TableWrapper } from 'shared/tableWrapper';
import { formatDate, hookStateChangeInjector } from 'shared/Utilities';
import { AdminPaginator } from './components/adminPaginator';
import { EditText } from 'react-edit-text';
import AppInput, { InputType } from 'components/AppInput';
import { Button, Col, Row } from 'react-bootstrap';
import { AdminProgramFacetList } from './components/adminProgramFacetList';
import { FileDropzone } from 'components/fileDropzone';

interface IProps {
  match?: any;
}

gql`
  query AdminPrograms($pagination: Pagination) {
    adminPrograms(pagination: $pagination) {
      id, name, imageUrl, live, archived, createdAt
      programFacets {
        id, name, imageUrl, order, live, archived, createdAt, description, goals, videoUrl, equipmentNeeded
      }
    }
  }

  mutation ModifyProgram($programId: Int!, $programInput: ProgramInput!) {
    modifyProgram(programId: $programId, programInput: $programInput) {
      id 
    }
  }

  mutation CreateProgram($programInput: ProgramInput!) {
    createProgram(programInput: $programInput) {
      id 
    }
  }
`

export const AdminPrograms: React.FC<IProps> = () => {
  const [pagination, setPagination] = React.useState<Pagination>();
  const programsQuery = useAdminProgramsQuery({ variables: { pagination } });
  const [createProgramMutation] = useCreateProgramMutation();
  const [modifyProgramMutation] = useModifyProgramMutation();
  const [programInput, setProgramInput] = React.useState<ProgramInput>({});
  const changeProgram = hookStateChangeInjector(programInput, setProgramInput);

  const modifyField = (field: keyof ProgramInput, programId: number) => (value: string | number | boolean) => {
    return modifyProgramMutation({ variables: { programId, programInput: { [field]: value } } })
      .catch(err => {
        console.error(err);
        window.alert("Failed to update value");
      })
  }

  const onCreateProgram = () => {
    createProgramMutation({ variables: { programInput } }).then(() => {
      programsQuery?.refetch?.();
    }).catch(err => {
      console.error(err);
      window.alert("Failed to update value");
    })
  }

  const columns = [
    '',
    'Name (ID)',
    'Image',
    'Is Live?',
    'Is Archived?',
    'Created At'
  ];

  return (
    <>
      <PageHeader title={`Programs`} rightItem={<AdminPaginator searchTerm='Programs' pagination={pagination} onChange={setPagination} />} />
      <TableContainer>
        <TableWrapper columns={columns}>
          <GqlQueryRender query={programsQuery}>
            {({ adminPrograms: programs }) => {
              return (
                <tbody>
                  {orderBy(programs, item => item.name, 'asc')
                    .map(item => {
                      return (
                        <>
                          <tr key={item.id}>
                            <td>{!!item.imageUrl && <img src={item.imageUrl} style={{ width: 75, maxHeight: 75, objectFit: 'contain' }} />}</td>
                            <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <EditText style={{ minWidth: 75 }} defaultValue={item.name} onSave={({ value }) => modifyField('name', item.id)(value)} />{`(${item.id})`}</td>
                            <td>
                              <EditText style={{ minWidth: 75 }} defaultValue={item.imageUrl} onSave={({ value }) => modifyField('imageUrl', item.id)(value)} />
                              <FileDropzone onSuccess={file => {
                                modifyField('imageUrl', item.id)(file).then(() => {
                                  programsQuery?.refetch?.();
                                })
                              }} accept={{ 'image/*': [] }} />
                            </td>
                            <td>
                              <AppInput
                                type={InputType.TOGGLE} defaultValue={item.live}
                                onChange={modifyField('live', item.id)} />
                            </td>
                            <td>
                              <AppInput
                                type={InputType.TOGGLE} defaultValue={item.archived}
                                onChange={modifyField('archived', item.id)} />
                            </td>
                            <td>{formatDate(item.createdAt)}</td>
                          </tr>
                          <tr>
                            <td colSpan={columns.length}  >
                              <AdminProgramFacetList
                                program={item}
                                refresh={() => programsQuery?.refetch?.()}
                              />
                            </td>
                          </tr>
                        </>
                      )
                    })}
                </tbody>
              )
            }}
          </GqlQueryRender>
        </TableWrapper>
      </TableContainer>

      <hr />
      <h4>Add New Program</h4>
      <Row>
        <Col md={5}>
          <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: 20 }}>
            <div style={{ width: '100%' }}>
              <AppInput type={InputType.TEXT} value={programInput.imageUrl} onChange={changeProgram('imageUrl')} label='Image URL*' wrapperStyle={{ width: '100%' }} />
            </div>

            <div >
              <span>&nbsp;</span>
              <FileDropzone
                onSuccess={changeProgram('imageUrl')}
                accept={{ 'image/*': [] }}
              />
            </div>
          </div>
        </Col>
        <Col md={5}>
          <AppInput type={InputType.TEXT} value={programInput.name} onChange={changeProgram('name')} label='Name*' />
        </Col>
      </Row>
      <Button variant='success' style={{ width: '100%' }} onClick={onCreateProgram}>Create</Button>
    </>
  );
}
