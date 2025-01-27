import React from 'react';
import { PageHeader } from 'components/PageHeader';
import { gql } from '@apollo/client';
import {
  useWorkoutQuery,
  ExerciseInput,
  CircuitInput,
  useModifyCircuitMutation,
  useModifyExerciseMutation,
  useCreateCircuitMutation,
  useCreateExerciseMutation,
  useCreateExerciseSetMutation,
  useModifyExerciseSetMutation,
  ExerciseSetInput,
  CircuitXlsxInput,
  useCreateCircuitsByXlsxMutation,
} from "types/gqlReactTypings.generated.d";
import { useParams } from 'react-router-dom';
import { compact, orderBy } from 'lodash';
import { TableWrapper } from 'shared/tableWrapper';
import { EditText, EditTextarea } from 'react-edit-text';
import { formatDate, hookStateChangeInjector } from 'shared/Utilities';
import AppInput, { InputType } from 'components/AppInput';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player'
import { FileDropzone } from 'components/fileDropzone';
import * as XLSX from 'xlsx';

interface Props {
}

const PLACEHOLDER_VIDEO = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

gql`
  query Workout($workoutId: Int!) {
    workout(workoutId: $workoutId) {
      id, name, week, order, skillLevel, archived, createdAt, programId, programFacetId,
      programFacet { id, name, program { id, name}}
      circuits { 
        id, name, order, archived, createdAt, programId, programFacetId, workoutId,
        exercises {
          id, name, order, videoUrl, restDurationSeconds, description, archived, createdAt
          exerciseSets {
            id, order, durationSeconds, repCount, weight, distance, percentageMax, repsAvailable, maxPercAvailable, weightRelative, weightUnit, archived, createdAt
          }
        }
       }
    }
  }

  mutation ModifyCircuit($circuitId: Int!, $circuitInput: CircuitInput!) {
    modifyCircuit(circuitId: $circuitId, circuitInput: $circuitInput) {
      id 
    }
  }

  mutation CreateCircuit($circuitInput: CircuitInput!) {
    createCircuit(circuitInput: $circuitInput) {
      id 
    }
  }

  mutation ModifyExercise($exerciseId: Int!, $exerciseInput: ExerciseInput!) {
    modifyExercise(exerciseId: $exerciseId, exerciseInput: $exerciseInput) {
      id 
    }
  }

  mutation CreateExercise($exerciseInput: ExerciseInput!) {
    createExercise(exerciseInput: $exerciseInput) {
      id
    }
  }

  mutation ModifyExerciseSet($exerciseSetId: Int!, $exerciseSetInput: ExerciseSetInput!) {
    modifyExerciseSet(exerciseSetId: $exerciseSetId, exerciseSetInput: $exerciseSetInput) {
      id 
    }
  }

  mutation CreateExerciseSet($exerciseSetInput: ExerciseSetInput!) {
    createExerciseSet(exerciseSetInput: $exerciseSetInput) {
      id
    }
  }

  mutation CreateCircuitsByXlsx($createCircuitsByXlsxInput: CreateCircuitsByXlsxInput!) {
    createCircuitsByXlsx(createCircuitsByXlsxInput: $createCircuitsByXlsxInput) {
      success
    }
  }
`

const WORKOUT_COLUMNS = [
  'Exercises',
  'Exercise Name (ID)',
  'Description',
  'Rank',
  'Rest Duration (seconds)',
  'Video',
  'Is Archived?',
  'Created At'
];

export const AdminWorkout: React.FC<Props> = () => {
  const { id } = useParams();
  const [circuitInput, setCircuitInput] = React.useState<CircuitInput>({});
  const [exerciseInput, setExerciseInput] = React.useState<ExerciseInput>({});
  const changeCircuit = hookStateChangeInjector(circuitInput, setCircuitInput);
  const changeExercise = hookStateChangeInjector(exerciseInput, setExerciseInput);
  const [modifyCircuitMutation] = useModifyCircuitMutation();
  const [modifyExerciseMutation] = useModifyExerciseMutation();
  const [modifyExerciseSetMutation] = useModifyExerciseSetMutation();
  const [createCircuitMutation] = useCreateCircuitMutation();
  const [createExerciseMutation] = useCreateExerciseMutation();
  const [createExerciseSetMutation] = useCreateExerciseSetMutation();
  const [createCircuitsByXlsxMutation] = useCreateCircuitsByXlsxMutation();


  const workoutQuery = useWorkoutQuery({ variables: { workoutId: parseInt(id ?? "-1") } });

  const workout = React.useMemo(() => workoutQuery.data?.workout, [workoutQuery.data?.workout]);

  console.info(changeCircuit, changeExercise);

  const modifyCircuitField = (field: keyof CircuitInput, circuitId: number) => (value: string | number | boolean) => {
    modifyCircuitMutation({ variables: { circuitId, circuitInput: { [field]: value } } })
      .catch(err => {
        console.error(err);
        window.alert("Failed to update value");
      })
  }


  const modifyExerciseField = (field: keyof ExerciseInput, exerciseId: number) => (value: string | number | boolean) => {
    return modifyExerciseMutation({ variables: { exerciseId, exerciseInput: { [field]: value } } })
      .catch(err => {
        console.error(err);
        window.alert("Failed to update value");
      })
  }

  const modifyExerciseSetField = (field: keyof ExerciseSetInput, exerciseSetId: number) => (value: string | number | boolean) => {
    modifyExerciseSetMutation({ variables: { exerciseSetId, exerciseSetInput: { [field]: value } } })
      .catch(err => {
        console.error(err);
        window.alert("Failed to update value");
      })
  }

  const onCreateCircuit = () => {
    createCircuitMutation({
      variables: {
        circuitInput: {
          ...circuitInput,
          programId: workout?.programId, programFacetId: workout?.programFacetId, workoutId: workout?.id,
        }
      }
    }).then(() => {
      workoutQuery?.refetch?.();
    }).catch(err => {
      console.error(err);
      window.alert("Failed to update value");
    })
  }

  const onCreateExercise = (circuitId: number) => () => {
    createExerciseMutation({
      variables: {
        exerciseInput: {
          programId: workout?.programId, programFacetId: workout?.programFacetId, workoutId: workout?.id, circuitId,
          name: 'TODO',
          videoUrl: PLACEHOLDER_VIDEO,
          restDurationSeconds: 30,
          description: 'TODO',
          order: 99
        }
      }
    }).then(() => {
      workoutQuery?.refetch?.();
    }).catch(err => {
      console.error(err);
      window.alert("Failed to update value");
    })
  }

  const onCreateExerciseSet = (circuitId: number, exerciseId: number) => () => {
    createExerciseSetMutation({
      variables: {
        exerciseSetInput: {
          programId: workout?.programId, programFacetId: workout?.programFacetId, workoutId: workout?.id, circuitId, exerciseId,
          order: 99,
          durationSeconds: 30,
          weight: .5
        }
      }
    }).then(() => {
      workoutQuery?.refetch?.();
    }).catch(err => {
      console.error(err);
      window.alert("Failed to update value");
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target != null && e.target.files != null) {
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        if (e.target != null) {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, { blankrows: true });
          const transformedData = transformData(parsedData);
          createCircuitsByXlsxMutation({
            variables: {
              createCircuitsByXlsxInput: {
                circuits: transformedData,
              },
            },
          })
            .then(() => {
              workoutQuery?.refetch?.();
            })
            .catch((err) => {
              console.error(err);
              window.alert("Failed to create ciruits");
            });
        }
      };
    }
  };

  function transformData(jsonData: Record<string, any>[]) {
    const circuits: CircuitXlsxInput[] = [];

    let currentCircuitIndex = -1;
    let currentExcerciseIndex = -1;
    for (const item of jsonData) {

      const {
        Rank: circuitRank,
        Circuit: circuitName,
        "Exercise Rank": exerciseRank,
        Exercise: exerciseName,
        Description: exerciseDescription,
        Rest: exerciseRestDuration,
        "Video Url": exerciseVideoUrl,
        Order: setOrder,
        Sets: setCount,
        Reps: setReps,
        Weight: setWeight,
        BW: setWeightRelative,
        Distance: setDistance,
        Duration: setDuration,
        "Use Distance?": setRepsAvailable,
        "Max %": setPercentageMax,
        "Use Max%?": setMaxPercAvailable,
      } = item;

      const missingFields: string[] = [];


      if (!circuitName && currentCircuitIndex == -1) missingFields.push('"Circuit Name"');
      if (!exerciseDescription && currentExcerciseIndex == -1) missingFields.push('"Exercise Name"');
      if (!exerciseRestDuration) missingFields.push('"Exercise Description"');
      if (!setCount) missingFields.push('"Set Count"');
      if (!setDuration) missingFields.push('"Set Duration"');
      if (!setWeight) missingFields.push('"Set Weight"');

      if (missingFields.length > 0) {
        const errorMessage = `Wrong file format. Missing fields: ${missingFields.join(
          ", "
        )}`;
        console.error(errorMessage);
        alert(errorMessage);
        throw errorMessage;
      }


      if (circuitName && circuitRank) {
        circuits.push({
          programId: workout?.programId,
          programFacetId: workout?.programFacetId,
          workoutId: workout?.id,
          order: circuitRank,
          name: circuitName,
          exercises: [],
        });
        currentCircuitIndex++;
        currentExcerciseIndex = -1;
      }
      if (exerciseName) {
        circuits[currentCircuitIndex].exercises.push({
          programId: workout?.programId,
          programFacetId: workout?.programFacetId,
          workoutId: workout?.id,
          order: exerciseRank ?? 1,
          name: exerciseName,
          description: exerciseDescription,
          restDurationSeconds: exerciseRestDuration,
          videoUrl: exerciseVideoUrl ?? "",
          sets: [],
        });
        currentExcerciseIndex++;
      }
      if (setCount && setDuration) {
        for (let i = 0; i < setCount; i++) {
          circuits[currentCircuitIndex].exercises[
            currentExcerciseIndex
          ].sets.push({
            programId: workout?.programId,
            programFacetId: workout?.programFacetId,
            workoutId: workout?.id,
            order: setOrder,
            repCount: setReps,
            distance: setDistance,
            weight: setWeight,
            percentageMax: setPercentageMax,
            repsAvailable: setRepsAvailable == "y",
            maxPercAvailable: setMaxPercAvailable == "y",
            weightRelative: setWeightRelative == "y",
            durationSeconds: setDuration,
          });
        }
      }

    }

    return circuits;
  }


  const sections = orderBy(compact(workout?.circuits), item => parseInt(`${item.order}`), 'asc').map(circuit => {
    return (
      <Card key={circuit.id} style={{ padding: 10, marginBottom: 20 }}>
        <Row>
          <Col sm={3}>
            <h6 style={{ marginBottom: 0 }}>Circuit Name</h6>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <EditText style={{ minWidth: 75 }} defaultValue={circuit.name} onSave={({ value }) => modifyCircuitField('name', circuit.id)(value)} />{`(${circuit.id})`}
            </div>
          </Col>
          <Col sm={3}>
            <h6 style={{ marginBottom: 0 }}>Circuit Rank</h6>
            <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(circuit.order)} onSave={({ value }) => modifyCircuitField('order', circuit.id)(parseInt(value))} />
          </Col>
          <Col sm={3}>
            <h6 style={{ marginBottom: 0 }}>Circuit is Archived?</h6>
            <AppInput
              type={InputType.TOGGLE} defaultValue={circuit.archived}
              onChange={modifyCircuitField('archived', circuit.id)} />
          </Col>
        </Row>

        <TableWrapper columns={WORKOUT_COLUMNS}>
          <tbody>
            {orderBy(circuit.exercises, item => parseInt(`${item.order}`), ['asc'])
              .map(item => {
                return (
                  <>
                    <tr key={item.id}>
                      <td>{!!item.videoUrl &&
                        <ReactPlayer url={item.videoUrl} width={200} height={120} controls={true} />}</td>
                      <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <EditText style={{ minWidth: 75 }} defaultValue={item.name} onSave={({ value }) => modifyExerciseField('name', item.id)(value)} />{`(${item.id})`}
                      </td>
                      <td>
                        <EditTextarea defaultValue={item.description} onSave={({ value }) => modifyExerciseField('description', item.id)(value)} />
                      </td>
                      <td>
                        <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(item.order)} onSave={({ value }) => modifyExerciseField('order', item.id)(parseInt(value))} />
                      </td>
                      <td>
                        <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(item.restDurationSeconds)} onSave={({ value }) => modifyExerciseField('restDurationSeconds', item.id)(parseInt(value))} />
                      </td>
                      <td>
                        <FileDropzone onSuccess={file => {
                          modifyExerciseField('videoUrl', item.id)(file).then(() => {
                            workoutQuery?.refetch?.();
                          })
                        }} accept={{ 'video/*': [] }} />
                        <EditTextarea defaultValue={item.videoUrl} onSave={({ value }) => modifyExerciseField('videoUrl', item.id)(value)} key={item.videoUrl} />
                      </td>
                      <td>
                        <AppInput
                          type={InputType.TOGGLE} defaultValue={item.archived}
                          onChange={modifyExerciseField('archived', item.id)} />
                      </td>
                      <td>{formatDate(item.createdAt)}</td>
                    </tr>
                    <tr key={`${item.id}-sets`}>
                      <td colSpan={WORKOUT_COLUMNS.length} style={{ paddingLeft: 150 }}>
                        <TableWrapper columns={['Set ID', 'Order', 'Duration (seconds)', 'Reps', 'Weight', 'Distance', 'Percentage Max', 'Use Distance?', 'Use Max%?', 'Body Weight?', 'Archived?', 'Created At']}>
                          {orderBy(item.exerciseSets, set => parseInt(`${set.order}`), 'asc').map(set => (
                            <tr key={set.id}>
                              <td>{set.id}</td>
                              <td>
                                <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(set.order)} onSave={({ value }) => modifyExerciseSetField('order', set.id)(parseInt(value))} />
                              </td>
                              <td>
                                <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(set.durationSeconds)} onSave={({ value }) => modifyExerciseSetField('durationSeconds', set.id)(parseInt(value))} />
                              </td>
                              <td>
                                <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(set.repCount)} onSave={({ value }) => modifyExerciseSetField('repCount', set.id)(parseInt(value))} />
                              </td>
                              <td>
                                <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(set.weight)} onSave={({ value }) => modifyExerciseSetField('weight', set.id)(parseFloat(value))} />
                              </td>
                              <td>
                                <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(set.distance)} onSave={({ value }) => modifyExerciseSetField('distance', set.id)(parseFloat(value))} />
                              </td>
                              <td>
                                <EditText style={{ minWidth: 75 }} type='number' defaultValue={String(set.percentageMax)} onSave={({ value }) => modifyExerciseSetField('percentageMax', set.id)(parseFloat(value))} />
                              </td>
                              <td>
                                <AppInput
                                  type={InputType.TOGGLE} defaultValue={set.repsAvailable}
                                  onChange={modifyExerciseSetField('repsAvailable', set.id)} />
                              </td>
                              <td>
                                <AppInput
                                  type={InputType.TOGGLE} defaultValue={set.maxPercAvailable}
                                  onChange={modifyExerciseSetField('maxPercAvailable', set.id)} />
                              </td>
                              <td>
                                <AppInput
                                  type={InputType.TOGGLE} defaultValue={set.weightRelative}
                                  onChange={modifyExerciseSetField('weightRelative', set.id)} />
                              </td>
                              <td>
                                <AppInput
                                  type={InputType.TOGGLE} defaultValue={set.archived}
                                  onChange={modifyExerciseSetField('archived', set.id)} />
                              </td>
                              <td>{formatDate(item.createdAt)}</td>
                            </tr>
                          ))}
                        </TableWrapper>
                        <Button style={{ width: '100%' }} size='sm' onClick={onCreateExerciseSet(circuit.id, item.id)}>Add New Exercise Set</Button>
                      </td>
                    </tr>
                  </>
                )
              })}
          </tbody>
        </TableWrapper>
        <Button style={{ width: '100%' }} size='sm' onClick={onCreateExercise(circuit.id)}>Add New Exercise</Button>
      </Card>
    )
  })


  return (
    <>
      <PageHeader
        title={`${workout?.name} (Week: ${workout?.week}, Day: ${workout?.order})`}
        subtitle={`Workout Exercises`}
        rightItem={
          <div style={{ marginLeft: "10px" }}>
            <input
              type="file"
              id="fileInput"
              className="form-control"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <Button
              className="btn btn-primary"
              onClick={() => {
                document?.getElementById("fileInput")?.click();
              }}
            >
              Add Xlsx
            </Button>
          </div>
        }
      />
      {sections}

      <hr />
      <h4>Add New Circuit</h4>
      <Row>
        <Col md={3}>
          <AppInput type={InputType.TEXT} value={circuitInput.name} onChange={changeCircuit('name')} label='Name*' />
        </Col>
        <Col md={2}>
          <AppInput type={InputType.NUMBER} value={circuitInput.order} onChange={changeCircuit('order')} label='Order*' />
        </Col>
      </Row>
      <Button variant='success' style={{ width: '100%', marginBottom: 30 }} onClick={onCreateCircuit}>Create</Button>
    </>
  )
}
