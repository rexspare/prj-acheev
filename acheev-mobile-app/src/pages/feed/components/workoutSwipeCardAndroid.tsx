import { compact, first, orderBy, sumBy } from 'lodash';
import React, { useRef, useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, ViewProps, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';
import { Colors } from '../../../shared/Constants';
import { CircuitFieldsFragment, CompletionModelType, OrderByDirection, useCompleteMutation, useCompletionsQuery, useWeightStatsQuery, } from '../../../types/gqlReactTypings.generated.d';
import { minuteSecondsString, shortDurationHumanizer, filterWorkoutExerciseSets } from '../../../shared/Utilities';
import { WorkoutAddModifySet } from './workoutAddModifySet';
import { WorkoutCircuitInlineSetEditor } from './workoutCircuitInlineSetEditor';
import CardsSwipe from '../../../vendor/card-swipe';
// import Carousel from 'react-native-snap-carousel';
// import AndroindVideo from 'react-native-video';
import { Video, AVPlaybackStatus, ResizeMode, Audio } from 'expo-av';
import VideoRN, { VideoRef } from 'react-native-video';

const iconCollapse = require(`../../../assets/images/icons/collapse.png`);
const iconPlay = require(`../../../assets/images/icons/play.png`);
const iconUncollapse = require(`../../../assets/images/icons/uncollapse.png`);
const iconPlusCircle = require(`../../../assets/images/icons/plus_circle.png`);
const icon_raw = require(`../../../assets/images/icon_raw.png`);

const vid1 = "https://acheev-public.s3.us-west-1.amazonaws.com/videos/lateral_bound_n_stick.mp4";
const vid2 = "https://acheev-public.s3.us-west-1.amazonaws.com/videos/lateral_push_to_base.mp4";
const VIDS = [vid1, vid2];
const DEFAULT_VIDEO_HEIGHT = 300;


interface IWorkoutSwipeCardAndroid {
    localExerciseId: number;
    orderedExercises: any[];
    index: number;
    currentIndex: number;
}

const WorkoutSwipeCardAndroid = (props: IWorkoutSwipeCardAndroid) => {
    const {
        localExerciseId,
        orderedExercises,
        index,
        currentIndex
    } = props
    const videoRef = useRef<VideoRef>(null);
    const [status, setStatus] = React.useState<AVPlaybackStatus>();
    const [paused, setpaused] = useState(false)
    const [isBuffering, setisBuffering] = useState(false)

    const exerciseId = localExerciseId

    useEffect(() => {
        if (currentIndex != index) {
            onpause()
        } else {
            onplay()
        }
    }, [localExerciseId, index, currentIndex])


    const onpause = async () => {
        // await videoRef?.current?.pauseAsync()
        await videoRef?.current?.pause()
        // await videoRef?.current?.unloadAsync()
    }

    const onplay = async () => {
        // await videoRef?.current?.playAsync()
        await videoRef?.current?.resume()
    }


    const localExercise = orderedExercises.find(item => item.id === localExerciseId);
    if (localExercise == null) {
        return null;
    }

    const handlePlaybackStatusUpdate = (status) => {

        if (status.isBuffering) {
            // Show a buffering indicator (e.g., a loading spinner)
        } else {
            // Hide the buffering indicator
        }
    };


    return (
        <View style={[styles.card, {

        }]} key={localExercise.id}>
            <View style={{ padding: 20, flexDirection: 'row' }}>
                <View style={{ borderColor: Colors.YELLOW, borderWidth: 1, borderStyle: 'solid', height: 30, width: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <AppText style={{ color: Colors.YELLOW, fontSize: 16 }}>{orderedExercises.indexOf(localExercise) + 1}</AppText>
                </View>
                <View>
                    <AppText style={{ color: 'white', fontSize: 16, lineHeight: 20, width: Dimensions.get('window').width * 0.55 }}>{localExercise.name}</AppText>
                    <AppText style={{ color: '#ffffffaa' }}>{minuteSecondsString(sumBy(localExercise.exerciseSets, item => item.durationSeconds))} </AppText>
                </View>
            </View>
            {/* <AndroindVideo
                videoRef={videoRef}
                onBuffer={onBuffer}
                onError={onError}
                repeat={true}
                resizeMode="cover"
                paused={currentIndex == index ? false : true}
                source={{ uri: localExercise.videoUrl.replace(/ /g, '%20') }}
                muted={mute}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            /> */}
            {/* {
                currentIndex == index &&
                <Video
                    ref={videoRef}
                    style={{ width: '100%', height: DEFAULT_VIDEO_HEIGHT }}
                    source={{ uri: localExercise.videoUrl.replace(/ /g, '%20') }}
                    useNativeControls
                    onReadyForDisplay={({ naturalSize: { width, height } }) => {

                    }}
                    resizeMode={ResizeMode.COVER}
                    isLooping={false}
                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />
            } */}
            {
                currentIndex == index &&
                <View style={{ width: '100%', height: DEFAULT_VIDEO_HEIGHT }}>
                    <VideoRN
                        ref={videoRef}
                        style={{ width: '100%', height: DEFAULT_VIDEO_HEIGHT }}
                        source={{ uri: localExercise.videoUrl.replace(/ /g, '%20') }}
                        resizeMode={ResizeMode.COVER}
                        repeat={true}
                        paused={paused}
                        controls={true}
                        onBuffer={(val) => {
                            setisBuffering(val.isBuffering)
                        }}
                    />
                    {
                        isBuffering &&
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                position: 'absolute',
                                alignSelf: 'center',
                                top: (DEFAULT_VIDEO_HEIGHT / 2) - 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 8,
                                backgroundColor: "rgba(0,0,0,0.5)"
                            }}
                        >
                            <ActivityIndicator color={Colors.WHITE} size={'large'} />
                        </View>
                    }
                </View>
            }
        </View>
    )
}

export default WorkoutSwipeCardAndroid

const styles = StyleSheet.create({
    cardContainer: {
        width: '92%',
        height: '70%',
    },
    card: {
        width: '100%',
        height: '100%',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.07,
        shadowRadius: 3.3,
        backgroundColor: '#2E2E2E',
        borderColor: Colors.YELLOW,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 18,
        overflow: 'hidden'
    },
    cardImg: {
        width: '100%',
        height: '100%',
        borderRadius: 13,
    },
});