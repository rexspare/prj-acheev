import { inProgressEventsStateSelectors, useInProgressEventsState } from "../states/inProgressEvents";
import firestore from '@react-native-firebase/firestore';
import { CurrentUserFieldsFragment, SkillLevel, Workout } from "../types/gqlReactTypings.generated.d";
import { Alert } from "react-native";
import { useContext, useState } from "react";
import { completedWorkoutsSelectors, useCompletedWorkoutsState } from "../states/completedWorkout";
import { AuthContext } from "../shared/auth/Authentication";

export const COMPLETED_WORKOUTS_COOLECTIONS = 'completedworkouts'
export const ALL_COMPLETED_WORKOUTS_COOLECTIONS = 'allCompletedworkouts'
export const USERS = 'users'

export type CompletedWorkout = {
    __typename: string,
    completedAt: null | number,
    durationMinutes: number,
    id: number,
    imageUrl: string,
    isCompleted: boolean,
    isFavorited: boolean,
    name: string,
    order: number,
    programFacetId: number,
    programId: number,
    skillLevel: SkillLevel,
    startedAt: null,
    week: number,
    user_id: string | number
}


const useCompletedWorkoutApi = () => {
    const { currentUser } = useContext(AuthContext)
    const completedWorkouts = useCompletedWorkoutsState(completedWorkoutsSelectors.completedWorkouts)
    const setcompletedWorkouts = useCompletedWorkoutsState(completedWorkoutsSelectors.setcompletedWorkouts)

    const getDocIdfromUser = (user: CurrentUserFieldsFragment) => {
        return `${user.id}&${user.phoneNumber}`
    }

    const getWorkoutId = (data: CompletedWorkout) => {
        return `${data.programFacetId}&${data.programId}&${data.id}${data.skillLevel}`
    }

    const getCompletedWorkoutsApi = (user: CurrentUserFieldsFragment) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data: CompletedWorkout[] = [];
                const docId = getDocIdfromUser(user);
                const querySnapshot = await firestore()
                    .collection(ALL_COMPLETED_WORKOUTS_COOLECTIONS)
                    .where('user_id', '==', user.id)
                    .get();

                querySnapshot.forEach((doc: any) => {
                    if (doc.exists) {
                        data.push({ ...doc.data(), doc_id: doc?.id });
                    } else {
                        console.log('No document found!');
                    }
                });
                setcompletedWorkouts(data)
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const addCompletedWorkoutsApi = (user: CurrentUserFieldsFragment, newEntry: CompletedWorkout) => {
        return new Promise(async (resolve, reject) => {
            try {
                const exists = completedWorkouts?.find((x: any) => x?.id == newEntry?.id)
                if (exists) {
                    resolve(true)
                }
                const docId = getDocIdfromUser(user);
                await firestore()
                    .collection(ALL_COMPLETED_WORKOUTS_COOLECTIONS)
                    .doc(getWorkoutId(newEntry))
                    .set(newEntry);
                await getCompletedWorkoutsApi(user)
                resolve(true);
            } catch (error) {
                resolve(false);
            }
        });
    };

    const removeCompletedWorksApi = (newEntry: CompletedWorkout, user = currentUser as CurrentUserFieldsFragment) => {
        return new Promise(async (resolve, reject) => {
            try {
                const docId = getDocIdfromUser(user);
                await firestore()
                    .collection(ALL_COMPLETED_WORKOUTS_COOLECTIONS)
                    .doc(getWorkoutId(newEntry))
                    .delete();
                await getCompletedWorkoutsApi(user)
                resolve(true);
            } catch (error) {
                resolve(error);
            }
        });
    };

    return {
        getCompletedWorkoutsApi,
        addCompletedWorkoutsApi,
        removeCompletedWorksApi,
    }

};

export default useCompletedWorkoutApi
    ;
