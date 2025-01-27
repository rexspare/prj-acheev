import Knex, { Knex as KnexInstance } from 'knex';
import { chunk, flatten, range } from 'lodash';
import { Model } from 'objection';
import { CircuitModel } from '../../src/models/circuitModel';
import { ExerciseModel } from '../../src/models/exerciseModel';
import { ExerciseSetModel } from '../../src/models/exerciseSetModel';
import { ProgramFacetModel } from '../../src/models/programFacetModel';
import { ProgramListEntryModel } from '../../src/models/programListEntryModel';
import { ProgramListModel } from '../../src/models/programListModel';
import { ProgramModel } from '../../src/models/programModel';
import { WorkoutModel } from '../../src/models/workoutModel';
import { SkillLevel, WeightUnit } from '../../src/types/gqlTypings.generated';

const knexFile = require('../../knexfile');
Model.knex(Knex(knexFile[process.env.NODE_ENV || 'development']));

// const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';
const PLACEHOLDER_VIDEO = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

export async function seed(knex: KnexInstance): Promise<any> {

  const programRunning = await ProgramModel.query().insert({
    live: true,
    name: 'Running',
    imageUrl: 'https://acheev-public.s3.us-west-1.amazonaws.com/programs/running.png'
  });
  const programBasketball = await ProgramModel.query().insert({
    live: true,
    name: 'Basketball',
    imageUrl: 'https://acheev-public.s3.us-west-1.amazonaws.com/programs/basketball.png'
  });
  const programSoccer = await ProgramModel.query().insert({
    live: true,
    name: 'Soccer',
    imageUrl: 'https://acheev-public.s3.us-west-1.amazonaws.com/programs/soccer.png'
  });

  const runningFacets = await ProgramFacetModel.query().insert([
    {
      programId: programRunning.id, live: true, order: 0,
      imageUrl: programRunning.imageUrl,
      name: 'Kick Start',
    },
    {
      programId: programRunning.id, live: true, order: 1,
      imageUrl: programRunning.imageUrl,
      name: 'Steady State',
    },
    {
      programId: programRunning.id, live: true, order: 2,
      imageUrl: programRunning.imageUrl,
      name: 'Distance',
    }
  ]);

  const basketballFacets = await ProgramFacetModel.query().insert([
    {
      programId: programBasketball.id, live: true, order: 0,
      imageUrl: programBasketball.imageUrl,
      name: 'Kick Start',
    },
    {
      programId: programBasketball.id, live: true, order: 1,
      imageUrl: programBasketball.imageUrl,
      name: 'Shooting',
    },
    {
      programId: programBasketball.id, live: true, order: 2,
      imageUrl: programBasketball.imageUrl,
      name: 'Dribbling',
    }
  ]);

  const soccerFacets = await ProgramFacetModel.query().insert([
    {
      programId: programSoccer.id, live: true, order: 0,
      imageUrl: programSoccer.imageUrl,
      name: 'Kick Start',
    },
    {
      programId: programSoccer.id, live: true, order: 1,
      imageUrl: programSoccer.imageUrl,
      name: 'Shooting',
    },
    {
      programId: programSoccer.id, live: true, order: 2,
      imageUrl: programSoccer.imageUrl,
      name: 'Dribbling',
    }
  ]);

  const workouts = flatten(await Promise.all(
    flatten(
      [runningFacets, soccerFacets, basketballFacets]
        .map(programFacets => {
          return flatten(programFacets.map(facet => {
            return flatten(Object.values(SkillLevel).map((skillLevel, skillLevelIndex) => {
              return WorkoutModel.query().insert(
                flatten(range(0, 6).map(week =>
                  range(0, 5).map(priority => {
                    return ({
                      programId: facet.programId,
                      live: true,
                      programFacetId: facet.id,
                      name: `Workout ${priority + 1}`,
                      skillLevel,
                      imageUrl: facet.imageUrl,
                      week,
                      order: priority,
                    })
                  })
                ))
              )
            }));
          }));
        })
    )
  ));

  const circuits = await CircuitModel.query().insert(flatten(workouts.map(({ programId, programFacetId, id: workoutId }) => ([
    { name: 'Stability', programId, programFacetId, workoutId },
    { name: 'Flexibility', programId, programFacetId, workoutId }
  ]))));

  const exercises = await ExerciseModel.query().insert(flatten(circuits.map(({ programId, programFacetId, workoutId, id: circuitId }) => ([
    {
      programId, programFacetId, workoutId, circuitId,
      name: 'Bodyweight Squats',
      videoUrl: PLACEHOLDER_VIDEO,
      restDurationSeconds: 30,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ac orci vel congue. Mauris et est congue, vestibulum sapien bibendum, suscipit nunc. Duis pellentesque laoreet arcu sit amet feugiat. Sed congue elit id pretium bibendum. Aenean non accumsan nibh. Aenean cursus aliquam scelerisque. Sed efficitur ante mauris, a laoreet metus sagittis consequat.',
    },
    {
      programId, programFacetId, workoutId, circuitId,
      name: 'Dynamic Stretches',
      videoUrl: PLACEHOLDER_VIDEO,
      restDurationSeconds: 45,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ac orci vel congue. Mauris et est congue, vestibulum sapien bibendum, suscipit nunc. Duis pellentesque laoreet arcu sit amet feugiat. Sed congue elit id pretium bibendum. Aenean non accumsan nibh. Aenean cursus aliquam scelerisque. Sed efficitur ante mauris, a laoreet metus sagittis consequat.',
    }
  ]))));

  await Promise.all(chunk(exercises, 1000)
    .map(batch =>
      ExerciseSetModel.query().insert(flatten(batch.map(({ programId, programFacetId, workoutId, circuitId, id: exerciseId }) => ([
        {
          programId, programFacetId, workoutId, circuitId, exerciseId, order: 0,
          durationSeconds: 45, weight: 0.5, weightRelative: true, weightUnit: WeightUnit.Pounds,
          repCount: 5,
        },
        {
          programId, programFacetId, workoutId, circuitId, exerciseId, order: 1,
          durationSeconds: 60, weight: 0.4, weightRelative: true, weightUnit: WeightUnit.Pounds,
        },
        {
          programId, programFacetId, workoutId, circuitId, exerciseId, order: 2,
          durationSeconds: 30, weight: 0.6, weightRelative: true, weightUnit: WeightUnit.Pounds,
        },
        {
          programId, programFacetId, workoutId, circuitId, exerciseId, order: 3,
          durationSeconds: 90, weight: 0.4, weightRelative: true, weightUnit: WeightUnit.Pounds,
          repCount: 10
        },
      ]))))
    ));


  const [personalizedProgramList, popularProgramList, latestProgramList, freeProgramList] = await ProgramListModel.query().insert([
    { name: 'Personalized Programs' },
    { name: 'Sports Programs' },
    { name: 'Latest Programs' },
    { name: 'Free Programs' },
  ]);

  await ProgramListEntryModel.query().insert([
    { programId: programBasketball.id, programListId: personalizedProgramList.id },
    { programId: programRunning.id, programListId: personalizedProgramList.id, },
    { programId: programSoccer.id, programListId: personalizedProgramList.id },

    { programId: programBasketball.id, programListId: popularProgramList.id },
    { programId: programSoccer.id, programListId: popularProgramList.id },


    { programId: programRunning.id, programListId: latestProgramList.id, },

    { programId: programBasketball.id, programListId: freeProgramList.id },
  ]);

  console.log('✅ Programs');
};
