import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Exercise, Workout } from '../../../types/gqlReactTypings.generated.d';
import { Colors } from '../../../shared/Constants';
import { AppText } from '../../../shared/components/AppText';
import { minuteSecondsString } from '../../../shared/Utilities';
import { sumBy } from 'lodash';
import { Video, AVPlaybackStatus, ResizeMode, Audio } from 'expo-av';
import VideoRN, { VideoRef } from 'react-native-video';
import Feather from 'react-native-vector-icons/Feather'

interface IWorkoutSwipeCardIosProps {
    index: number;
    localExerciseId: number;
    currentIndex: number;
    orderedExercises: any[];
}

const DEFAULT_VIDEO_HEIGHT = 300;




const WorkoutSwipeCardIos = (props: IWorkoutSwipeCardIosProps) => {
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
    const [videoHeights, setVideoHeights] = useState<{ [videoId: string]: number }>({});
    const [isMuted, setisMuted] = useState(false)

    const exerciseId = localExerciseId

    useEffect(() => {
        if (currentIndex != index) {
            onpause()
        } else {
            onplay()
        }
    }, [localExerciseId, index, currentIndex])


    const onpause = async () => {
        await videoRef?.current?.pause()
    }

    const onplay = async () => {
        await videoRef?.current?.resume()
    }

    const localExercise = orderedExercises.find(item => item.id === localExerciseId);
    if (localExercise == null) {
        return null;
    }


    return (
        <View style={[styles.card, {

        }]} key={localExercise.id}>
            <View style={{ padding: 20, flexDirection: 'row' }}>
                <View style={{ borderColor: Colors.YELLOW, borderWidth: 1, borderStyle: 'solid', height: 30, width: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <AppText style={{ color: Colors.YELLOW, fontSize: 16 }}>{orderedExercises.indexOf(localExercise) + 1}</AppText>
                </View>
                <View>
                    <AppText style={{ color: 'white', fontSize: 16 }}>{localExercise.name}</AppText>
                    <AppText style={{ color: '#ffffffaa' }}>{minuteSecondsString(sumBy(localExercise.exerciseSets, item => item.durationSeconds))} </AppText>
                </View>
            </View>

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
                        muted={isMuted}
                        controls={true}
                        onBuffer={(val) => {
                            setisBuffering(val.isBuffering)
                        }}
                    />
                    {/* <View style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width:'80%',
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                // if (isMuted) {
                                //     videoRef.current?.setVolume(10)
                                // } else {
                                //     videoRef.current?.setVolume(0)
                                // }
                                setisMuted(!isMuted)
                            }}
                        >
                            <Feather name={!isMuted ? 'volume-2' : 'volume-x'} color={'#FFFFFF'} size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // if (paused) {
                                //     videoRef.current?.pause()
                                // } else {
                                //     videoRef.current?.resume()
                                // }
                                setpaused(!paused)
                            }}
                        >
                            <Feather name={!paused ? 'play' : 'pause'} color={'#FFFFFF'} size={30} />
                        </TouchableOpacity>
                    </View> */}
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

export default WorkoutSwipeCardIos

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