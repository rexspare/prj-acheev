import React from 'react';
import { PageHeader } from 'components/PageHeader';
import { gql } from '@apollo/client';
import { SkillLevel, useCreateWorkoutMutation, useModifyWorkoutMutation, useProgramFacetQuery, useWorkoutsQuery, WorkoutInput } from 'types/gqlReactTypings.generated.d';
import { useParams } from 'react-router-dom';
import { Button, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { compact, first, lowerCase, orderBy, startCase } from 'lodash';
import { TableContainer } from 'shared/CommonStyles';
import { TableWrapper } from 'shared/tableWrapper';
import { EditText } from 'react-edit-text';
import { formatDate, hookStateChangeInjector } from 'shared/Utilities';
import AppInput, { InputType } from 'components/AppInput';
import { AdminRoutes, getAdminIdSluggedPath } from 'shared/Routes';
import { FileDropzone } from 'components/fileDropzone';
interface Props {
}

gql`
  query ProgramFacet($programFacetId: Int!) {
    programFacet(programFacetId: $programFacetId) {
      id, programId, name, imageUrl, program { id, name}
    }
  }

  query Workouts($programFacetId: Int!, $skillLevel: SkillLevel!) {
    workouts(programFacetId: $programFacetId, skillLevel: $skillLevel) {
      id, skillLevel, name, completedAt, startedAt, imageUrl, week, order, durationMinutes, 
      archived, createdAt
    }
  }

  mutation ModifyWorkout($workoutId: Int!, $workoutInput: WorkoutInput!) {
    modifyWorkout(workoutId: $workoutId, workoutInput: $workoutInput) {
      id 
    }
  }

  mutation CreateWorkout($workoutInput: WorkoutInput!) {
    createWorkout(workoutInput: $workoutInput) {
      id 
    }
  }
`

const WORKOUT_COLUMNS = [
  '',
  'Name (ID)',
  'Week',
  'Rank',
  'Image',
  'Is Archived?',
  'Created At'
];

const ORDERED_SKILLS = [
  SkillLevel.Beginner, SkillLevel.Intermediate, SkillLevel.Advanced, SkillLevel.Expert, SkillLevel.Professional
]

export const AdminProgramFacet: React.FC<Props> = () => {
  const { id } = useParams();
  const [createWorkoutMutation] = useCreateWorkoutMutation();
  const [modifyWorkoutMutation] = useModifyWorkoutMutation();
  const [workoutInput, setWorkoutInput] = React.useState<WorkoutInput>({
  });
  const change = hookStateChangeInjector(workoutInput, setWorkoutInput);

  const programFacetQuery = useProgramFacetQuery({ variables: { programFacetId: parseInt(id ?? "0") } })
  const [skillLevel, setSkillLevel] = React.useState<SkillLevel>(SkillLevel.Beginner);
  const facet = React.useMemo(() => programFacetQuery.data?.programFacet, [programFacetQuery.data]);

  const workouts = useWorkoutsQuery({ variables: { programFacetId: facet?.id ?? -1, skillLevel }, skip: facet == null });

  const modifyField = (field: keyof WorkoutInput, workoutId: number) => async (value: string | number | boolean) => {
    try {
      return await modifyWorkoutMutation({ variables: { workoutId, workoutInput: { [field]: value } } });
    } catch (err) {
      console.error(err);
      return window.alert("Failed to update value");
    }
  }

  const onCreateWorkout = (localSkilllevel: SkillLevel) => () => {
    createWorkoutMutation({
      variables: {
        workoutInput: {
          ...workoutInput,
          programId: facet?.programId, programFacetId: facet?.id,
          skillLevel: localSkilllevel
        }
      }
    }).then(() => {
      programFacetQuery?.refetch?.();
      workouts?.refetch?.({ skillLevel, programFacetId: facet?.id });
    }).catch(err => {
      console.error(err);
      window.alert("Failed to update value");
    })
  }

  console.info(first(workouts.data?.workouts));

  const tabs = ORDERED_SKILLS.map(skillLevel => {
    return (
      <Tab key={skillLevel} eventKey={skillLevel} title={startCase(lowerCase(skillLevel))}>
        <TableContainer>
          <TableWrapper columns={WORKOUT_COLUMNS}>
            <tbody>
              {orderBy(orderBy(compact(workouts.data?.workouts), item => parseInt(`${item.order}`), 'asc'), item => parseInt(`${item.week}`), 'asc')
                .map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{!!item.imageUrl && <img src={item.imageUrl} style={{ width: 75, maxHeight: 75, objectFit: 'contain' }} />}</td>
                      <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <EditText style={{ minWidth: 75 }} defaultValue={item.name} onSave={({ value }) => modifyField('name', item.id)(value)} />{`(${item.id})`}</td>
                      <td>
                        <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(item.week)} onSave={({ value }) => modifyField('week', item.id)(parseInt(value))} />
                      </td>
                      <td>
                        <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(item.order)} onSave={({ value }) => modifyField('order', item.id)(parseInt(value))} />
                      </td>
                      <td>
                        <EditText style={{ minWidth: 75 }} defaultValue={item.imageUrl} onSave={({ value }) => modifyField('imageUrl', item.id)(value)} />
                        <FileDropzone onSuccess={file => {
                          modifyField('imageUrl', item.id)(file).then(() => {
                            programFacetQuery?.refetch?.();
                            workouts?.refetch?.();
                          })
                        }} accept={{ 'image/*': [] }} />
                      </td>
                      <td>
                        <AppInput
                          type={InputType.TOGGLE} defaultValue={item.archived}
                          onChange={modifyField('archived', item.id)} />
                      </td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td><Button size='sm' href={getAdminIdSluggedPath(AdminRoutes.WORKOUT, item.id)} >Edit Exercises</Button></td>
                    </tr>
                  )
                })}
            </tbody>
          </TableWrapper>
        </TableContainer>

        <hr />
        <h4>Add New Workout</h4>
        <Row>
          <Col md={3}>
            <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: 20 }}>
              <div style={{ width: '100%' }}>
                <AppInput type={InputType.TEXT} value={workoutInput.imageUrl} onChange={change('imageUrl')} label='Image URL*' wrapperStyle={{ width: '100%' }} />
              </div>

              <div >
                <span>&nbsp;</span>
                <FileDropzone
                  onSuccess={change('imageUrl')}
                  accept={{ 'image/*': [] }}
                />
              </div>
            </div>
          </Col>



          <Col md={3}>
            <AppInput type={InputType.TEXT} value={workoutInput.name} onChange={change('name')} label='Name*' />
          </Col>
          <Col md={2}>
            <AppInput type={InputType.NUMBER} value={workoutInput.week} onChange={change('week')} label='Week*' />
          </Col>
        </Row>
        <Button variant='success' style={{ width: '100%' }} onClick={onCreateWorkout(skillLevel)}>Create</Button>
      </Tab>
    )
  })


  return (
    <>
      <PageHeader title={`${facet?.name} (${facet?.program.name})`} subtitle={`Focus Workouts`} />

      <Tabs
        activeKey={skillLevel}
        onSelect={(k) => setSkillLevel(k as SkillLevel)}
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {tabs}
      </Tabs>

    </>
  )
}
