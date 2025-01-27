import { inProgressEventsStateSelectors, useInProgressEventsState } from "../states/inProgressEvents";
import firestore from '@react-native-firebase/firestore';
import { CurrentUserFieldsFragment, Workout } from "../types/gqlReactTypings.generated.d";
import { Alert } from "react-native";
import { useState } from "react";

export const INPROGRESS_EVENTS_COOLECTIONS = 'inprogressWorkouts'
export const USERS = 'users'

export type InprogressEvent = {
    __typename: string;
    archived: false;
    description: string;
    equipmentNeeded: string;
    goals: string;
    id?: number;
    imageUrl: string | null;
    live: boolean;
    name: string
    order?: number | string;
    program: {
        __typename: "Program";
        id: number;
        name: string;
    };
    videoUrl: string | null;
    workout?: {
        __typename?: "Workout";
        id?: number;
        week?: number;
        imageUrl?: string | null;
        duration?: number;
        name?: string;
        metadata?: Workout | any;
        completedAt?: number;
    },
    nextWorkout?: {
        __typename?: "Workout";
        id?: number;
        week?: number;
        imageUrl?: string | null;
        duration?: number;
        name?: string;
        metadata?: Workout | any;
    },
    skillLevel?: string;
    doc_id?: string;
    user_id?: string | number;
}


const useInprogressEventsApi = () => {
    const inProgressEventsData = useInProgressEventsState(inProgressEventsStateSelectors.inProgressEvents)
    const setinProgressEventsData = useInProgressEventsState(inProgressEventsStateSelectors.setinProgressEvents)

    const getDocIdfromUser = (user: CurrentUserFieldsFragment) => {
        return `${user.id}&${user.phoneNumber}`
    }

    const getWorkoutIdfromUser = (data: InprogressEvent) => {
        return `${data.id}&${data.program.id}&${data.skillLevel}`
    }

    const getInProgressEventsApi = (user: CurrentUserFieldsFragment) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data: InprogressEvent[] = [];
                const docId = getDocIdfromUser(user);
                const querySnapshot = await firestore()
                    .collection(USERS)
                    .doc(docId)
                    .collection(INPROGRESS_EVENTS_COOLECTIONS)
                    .get();

                querySnapshot.forEach((doc: any) => {
                    if (doc.exists) {
                        data.push({ ...doc.data(), doc_id: doc?.id });
                    } else {
                        console.log('No document found!');
                    }
                });
                setinProgressEventsData(data)
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const addInProgressEventsApi = (user: CurrentUserFieldsFragment, newEntry: InprogressEvent) => {
        return new Promise(async (resolve, reject) => {
            try {
                const docId = getDocIdfromUser(user);
                await firestore()
                    .collection(USERS)
                    .doc(docId)
                    .collection(INPROGRESS_EVENTS_COOLECTIONS)
                    .doc(getWorkoutIdfromUser(newEntry))
                    .set(newEntry);

                const exists = inProgressEventsData?.find((x: InprogressEvent) => getWorkoutIdfromUser(x) == getWorkoutIdfromUser(newEntry))
                if (exists) {
                    const mList = inProgressEventsData?.map((item: InprogressEvent) => {
                        if (getWorkoutIdfromUser(item) == getWorkoutIdfromUser(newEntry)) {
                            return {
                                ...newEntry,
                                doc_id: getWorkoutIdfromUser(newEntry)
                            }
                        } else {
                            return item
                        }
                    })
                    setinProgressEventsData(mList)
                } else {
                    setinProgressEventsData([
                        ...inProgressEventsData,
                        {
                            ...newEntry,
                            doc_id: getWorkoutIdfromUser(newEntry)
                        }])
                }

                await getInProgressEventsApi(user)
                resolve(true);
            } catch (error) {
                resolve(error);
            }
        });
    };

    const removeInProgressEventsApi = (user: CurrentUserFieldsFragment, newEntry: InprogressEvent) => {
        return new Promise(async (resolve, reject) => {
            try {

                const docId = getDocIdfromUser(user);
                await firestore()
                    .collection(USERS)
                    .doc(docId)
                    .collection(INPROGRESS_EVENTS_COOLECTIONS)
                    .doc(getWorkoutIdfromUser(newEntry))
                    .delete();
                await getInProgressEventsApi(user)
                resolve(true);
            } catch (error) {
                resolve(error);
            }
        });
    };


    return {
        getInProgressEventsApi,
        addInProgressEventsApi,
        removeInProgressEventsApi
    }



};

export default useInprogressEventsApi
    ;
