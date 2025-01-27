import React from 'react';
import gql from 'graphql-tag';
import { TableContainer } from "shared/CommonStyles";
import { AdminProgramsQuery, ProgramFacetInput, useCreateProgramFacetMutation, useModifyProgramFacetMutation } from 'types/gqlReactTypings.generated.d';
import { orderBy } from 'lodash';
import { TableWrapper } from 'shared/tableWrapper';
import { formatDate, hookStateChangeInjector } from 'shared/Utilities';
import { EditText, EditTextarea } from 'react-edit-text';
import AppInput, { InputType } from 'components/AppInput';
import { Button, Col, Row, } from 'react-bootstrap';
import { AdminRoutes, getIdSluggedPath } from 'shared/Routes';
import { FileDropzone } from 'components/fileDropzone';

interface Props {
  program: AdminProgramsQuery['adminPrograms'][0];
  refresh: () => void;
}

gql`
  mutation ModifyProgramFacet($programFacetId: Int!, $programFacetInput: ProgramFacetInput!) {
    modifyProgramFacet(programFacetId: $programFacetId, programFacetInput: $programFacetInput) {
      id 
    }
  }

  mutation CreateProgramFacet($programFacetInput: ProgramFacetInput!) {
    createProgramFacet(programFacetInput: $programFacetInput) {
      id 
    }
  }
`

export const AdminProgramFacetList: React.FC<Props> = ({ program, refresh }: Props) => {
  const [programFacetInput, setProgramFacetInput] = React.useState<ProgramFacetInput>({
    programId: program.id,
  });
  const changeProgram = hookStateChangeInjector(programFacetInput, setProgramFacetInput);
  const [createProgramFacetMutation] = useCreateProgramFacetMutation();
  const [modifyProgramFacetMutation] = useModifyProgramFacetMutation();
  const [showAdd, setShowAdd] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);

  const modifyField = (field: keyof ProgramFacetInput, programFacetId: number) => (value: string | number | boolean) => {
    return modifyProgramFacetMutation({ variables: { programFacetId, programFacetInput: { [field]: value } } })
      .catch(err => {
        console.error(err);
        window.alert("Failed to update value");
      })
  }

  const onCreateProgramFacet = () => {
    createProgramFacetMutation({ variables: { programFacetInput } }).then(() => {
      refresh();
    }).catch(err => {
      console.error(err);
      window.alert("Failed to update value");
    })
  }

  const columns = [
    'Facet',
    'Name (ID)',
    'Rank',
    'Image',
    'Info Video',
    'About',
    'Equipment',
    'Goals',
    'Is Live?',
    'Is Archived?',
    'Created At'
  ];


  if (!show) {
    return <Button onClick={() => setShow(true)} style={{ width: '100%' }} variant='outline-primary'>Show {program.programFacets.length} {program.name} facets</Button>;
  }

  return (
    <div style={{ paddingLeft: 30 }}>
      <TableContainer>
        <TableWrapper columns={columns}>
          <tbody>
            {orderBy(program.programFacets, item => parseInt(`${item.order}`), 'asc')
              .map(item => {
                return (
                  <tr key={item.id}>
                    <td>{!!item.imageUrl && <img src={item.imageUrl} style={{ width: 75, maxHeight: 75, objectFit: 'contain' }} />}</td>
                    <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <EditText style={{ minWidth: 75 }} defaultValue={item.name} onSave={({ value }) => modifyField('name', item.id)(value)} />{`(${item.id})`}</td>
                    <td>
                      <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(item.order)} onSave={({ value }) => modifyField('order', item.id)(parseInt(value))} />
                    </td>
                    <td>
                      <EditText style={{ minWidth: 75, maxWidth: 300 }} defaultValue={item.imageUrl} onSave={({ value }) => modifyField('imageUrl', item.id)(value)} />
                      <FileDropzone onSuccess={file => {
                        modifyField('imageUrl', item.id)(file).then(() => {
                          refresh?.();
                        })
                      }} accept={{ 'image/*': [] }} />
                    </td>

                    <td>
                      <EditTextarea defaultValue={item.videoUrl} onSave={({ value }) => modifyField('videoUrl', item.id)(value)} key={item.videoUrl} />
                      <FileDropzone onSuccess={file => {
                        modifyField('videoUrl', item.id)(file).then(() => {
                          refresh?.();
                        })
                      }} accept={{ 'video/*': [] }} />

                    </td>
                    <td>
                      <EditTextarea defaultValue={item.description} onSave={({ value }) => modifyField('description', item.id)(value)} />
                    </td>
                    <td>
                      <EditTextarea defaultValue={item.equipmentNeeded} onSave={({ value }) => modifyField('equipmentNeeded', item.id)(value)} />
                    </td>
                    <td>
                      <EditTextarea defaultValue={item.goals} onSave={({ value }) => modifyField('goals', item.id)(value)} />
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
                    <td><Button size='sm' href={getIdSluggedPath(AdminRoutes.FACET, item.id)} >Edit Workouts</Button></td>
                  </tr>
                )
              })}
          </tbody>
        </TableWrapper>
      </TableContainer>

      {showAdd ?
        <>
          <hr />
          <h4>Add New Facet</h4>
          <Row>

            <Col md={5}>
              <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: 20 }}>
                <div style={{ width: '100%' }}>
                  <AppInput type={InputType.TEXT} value={programFacetInput.imageUrl} onChange={changeProgram('imageUrl')} label='Image URL*' wrapperStyle={{ width: '100%' }} />
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
              <AppInput type={InputType.TEXT} value={programFacetInput.name} onChange={changeProgram('name')} label='Name*' />
            </Col>
          </Row>
          <Button variant='success' style={{ width: '100%' }} onClick={onCreateProgramFacet}>Create</Button>
        </>
        :
        <Button onClick={() => setShowAdd(true)} style={{ width: '100%' }} variant='success'>Add Facet</Button>
      }
    </div>
  );
}
