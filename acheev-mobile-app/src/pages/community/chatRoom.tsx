import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import useKeyboard from '../../hooks/useKeyboard';
import { Colors } from '../../shared/Constants';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { SafeView } from '../../shared/components/SafeView';
import { communityStateSelectors, useCommunityState } from '../../states/community';
import { ChatMessage, OrderByDirection, PaginationMeta, useDeleteMessageMutation, useDeleteS3ObjectMutation, useGetProgramMessagesQuery, useSendMessageMutation, useSignUrlLazyQuery, useSubscriptionSubscription } from '../../types/gqlReactTypings.generated.d';
import ChatBubble from './components/chatBubble';
import ImageViewerModal from './components/imageViewerModal';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { Filter } from 'bad-words'

const customFilter = new Filter({ placeHolder: 'BAD_LETTER' })
interface Props extends StackScreenProps<NavigatorParams, AppRoutes.CHAT_ROOM> {
}

const ChatRoom: React.FC<Props> = ({ navigation, route }: Props) => {
    const program = route.params.program
    const setselectedProgram = useCommunityState(communityStateSelectors.setselectedProgram)
    const { keyboardStatus } = useKeyboard()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isImageModalVisible, setisImageModalVisible] = useState<boolean>(false)
    const [text, settext] = useState("")
    const [publicUrl_, setpublicUrl_] = useState("")
    const [selectedMedia, setselectedMedia] = useState<any>(null)
    const [chatMessages, setchatMessages] = useState<ChatMessage[]>([])
    const [fetchingMore, setfetchingMore] = useState(false)
    const [uploadedMediaPublicUrl, setuploadedMediaPublicUrl] = useState("")
    const [openenMedia, setopenenMedia] = useState<string | null>(null) // on chat bubble when user want to see image in full screen
    const [replyingTo, setreplyingTo] = useState<ChatMessage | null>(null)
    const currentPageRef = useRef(0)
    const paginationRef = useRef<PaginationMeta | any>({})
    const fetchingMoreRef = useRef<boolean>(false)
    const fetchingRepliedMessage = useRef<boolean | number>(false)
    const flatlistRef = useRef<FlatList>(null)

    const [useSignUrl] = useSignUrlLazyQuery({});

    const messagesQuery = useGetProgramMessagesQuery({
        variables: {
            programId: program?.id,
            pagination: {
                limit: 20,
                page: currentPageRef.current,
                orderBy: [
                    {
                        // column: "createdAt",
                        column: "created_at",
                        direction: OrderByDirection.Desc
                    }
                ]
            },
            historyMessageId: undefined
        },
        fetchPolicy: 'network-only'
    })

    const [sendMessageMutation] = useSendMessageMutation({
        variables: {
            programId: program?.id,
            text: text,
            mediaUrl: publicUrl_ || "",
            mediaType: selectedMedia?.type || "",
            ...(replyingTo?.id && { replyToId: replyingTo?.id })
        }
    })

    const [deleteS3ObjectMutation] = useDeleteS3ObjectMutation({
        variables: {
            fileKey: uploadedMediaPublicUrl
        }
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: program.name ? `${program.name} Discussion` : "test",
        });
    }, [navigation]);

    useEffect(() => {
        if (messagesQuery?.data?.getProgramMessages.data != undefined && fetchingRepliedMessage?.current == false) {
            setchatMessages([...chatMessages, ...messagesQuery?.data?.getProgramMessages.data as ChatMessage[]])
            paginationRef.current = messagesQuery?.data?.getProgramMessages.meta
        }
    }, [messagesQuery?.data])

    // HANDLE GET MORE
    const handleGetMoreMessages = () => {
        if (fetchingMoreRef.current == true) {
            return
        }

        if (fetchingMoreRef.current == false &&
            paginationRef.current.hasNextPage == true &&
            fetchingMore == false) {

            setfetchingMore(true)
            fetchingMoreRef.current = true
            messagesQuery.fetchMore({
                variables: {
                    programId: program?.id,
                    pagination: {
                        limit: 20,
                        page: currentPageRef.current + 1,
                        orderBy: [
                            {
                                // column: "createdAt",
                                column: "created_at",
                                direction: OrderByDirection.Desc
                            }
                        ]
                    }
                }
            }).then((res) => {
                currentPageRef.current = currentPageRef.current + 1
                paginationRef.current = res.data.getProgramMessages.meta
                fetchingMoreRef.current = false
                setfetchingMore(false)
            }).catch(() => {
                fetchingMoreRef.current = false
                setfetchingMore(false)
            });
        }
    }

    // SUBSCRIPTION
    const { data, loading, error } = useSubscriptionSubscription({ variables: {} });

    useEffect(() => {
        console.info(data?.newMessage?.id, data?.newMessage?.isDeleted)
        if (data?.newMessage && data?.newMessage?.programId == program?.id) {
            if (data?.newMessage?.isDeleted == true) {
                const mData = chatMessages?.map((x: ChatMessage) => x?.id == data?.newMessage?.id ? data?.newMessage : x)
                setchatMessages(mData)
            } else {
                setchatMessages([data.newMessage, ...chatMessages,])
            }
        }
    }, [data?.newMessage?.id, data?.newMessage?.isDeleted])
    // END


    const pickImage = async () => {

        // No permissions request is necessary for launching the image library
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: .6,
        });

        if (!result.cancelled) {
            const localUri = result.uri || result?.assets?.length > 0 ? result?.assets[0]?.uri : undefined;
            const file = result?.assets?.length > 0 ? result?.assets[0] : undefined;
            setselectedMedia(file)

        }
    };

    const onPressImage = (msg: string) => {
        setopenenMedia(msg)
        setisImageModalVisible(true)
    }

    const handleUplaodMedia = async () => {
        return new Promise((resolve, reject) => {
            const uriParts = selectedMedia.uri.split('/')
            const fileName = uriParts[uriParts.length - 1]

            useSignUrl({ variables: { objectName: fileName, contentType: selectedMedia.type } })
                .then(async (res) => {
                    if (res.data == null) {
                        console.error("Signed data does not exist");
                        return;
                    }

                    const { signedUrl, publicUrl } = res.data.signUrl;
                    const publicUrlParts = publicUrl?.split("upload/")
                    const fileKey = publicUrlParts?.length > 0 ? publicUrlParts[publicUrlParts?.length - 1] : publicUrl
                    setuploadedMediaPublicUrl(fileKey)
                    const response = await fetch(selectedMedia.uri);
                    const fileBlob = await response.blob();
                    fetch(signedUrl, {
                        method: 'PUT',
                        body: fileBlob,
                        headers: {
                            'Content-Type': selectedMedia.type || 'application/octet-stream',
                        },
                    })
                        .then(() => {
                            setpublicUrl_(publicUrl)

                            resolve(publicUrl)
                        })
                        .catch((err) => {
                            console.info('Upload error:', err)
                            setpublicUrl_("")
                            resolve(false)
                        });

                }).catch((error) => {
                    console.info('Siging Url Error error:', error)
                    setpublicUrl_("")
                    resolve(false)
                });
        })
    }

    // CHECK MEDIA PROFANITY
    const moderateMedia = async (url: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get('https://api.sightengine.com/1.0/check.json', {
                    params: {
                        url: 'https://sightengine.com/assets/img/examples/example7.jpg',
                        models: 'nudity-2.1,weapon,alcohol,recreational_drug,medical,offensive,text-content,gore-2.0,tobacco,violence,self-harm',
                        api_user: '1927414877',
                        api_secret: 'bFMHu8oLipuhM8rdrxthnR2ykbjanWp8',
                    }
                });
                resolve(response.data)
            } catch (error: any) {
                if (error.response) {
                    console.info(error.response.data);
                } else {
                    console.info(error.message);
                }
                resolve(false)
            }
        })
    }

    // VALIDATE PROFANITY DATA 
    const checkViolatingContent = (data: any, threshold = 0.5) => {
        const violations: any = [];

        // Check top-level categories
        if (data.alcohol?.prob >= threshold) {
            violations.push("Alcohol content");
        }

        if (data.gore?.prob >= threshold) {
            violations.push("Gore content");
        }

        if (data.nudity?.mildly_suggestive >= threshold ||
            data.nudity?.erotica >= threshold ||
            data.nudity?.sexual_activity >= threshold ||
            data.nudity?.very_suggestive >= threshold) {
            violations.push("Nudity or suggestive content");
        }

        if (data.offensive?.prob >= threshold) {
            violations.push("Offensive content");
        }

        if (data.recreational_drug?.prob >= threshold) {
            violations.push("Recreational drug content");
        }

        if (data.self_harm?.prob >= threshold) {
            violations.push("Self-harm content");
        }

        if (data.tobacco?.prob >= threshold) {
            violations.push("Tobacco content");
        }

        if (data.violence?.prob >= threshold) {
            violations.push("Violence content");
        }

        if (data.weapon?.classes) {
            for (const [type, prob] of Object.entries(data.weapon.classes)) {
                if (prob >= threshold) {
                    violations.push(`Weapon detected: ${type}`);
                }
            }
        }

        // Additional detailed checks
        for (const [category, classes] of Object.entries(data)) {
            if (classes?.classes) {
                for (const [subCategory, prob] of Object.entries(classes.classes)) {
                    if (prob >= threshold) {
                        violations.push(`${category} - ${subCategory}`);
                    }
                }
            }
        }

        return violations.length
            ? `Violating content found: ${violations.join(", ")}`
            : true;
    }


    const handleSendMessage = async () => {


        const cleanMessage = customFilter.clean(text)

        if (cleanMessage?.includes("BAD_LETTER")) {
            Alert.alert("Bad Word", "Acheev does not support profanity!")
            return
        }

        if (text == '' && selectedMedia == null) {
            return
        }
        let urlResponse: any = ""
        try {
            setIsLoading(true)
            if (selectedMedia?.uri) {
                urlResponse = await handleUplaodMedia()
                const mediaProfanity = await moderateMedia(urlResponse)
                const isMediaClear = checkViolatingContent(mediaProfanity)
                if (isMediaClear != true) {
                    Alert.alert("Violating Content", "Acheev App does not suppoert Profanity/Violating Conent")
                    deleteS3ObjectMutation()
                        .then((res) => {
                            setuploadedMediaPublicUrl("")
                        })
                        .catch((error) => {
                        })
                    return
                }

            }

            if (urlResponse === false) {
                Alert.alert("Upload Error", "There was an error uploading media message not sent!")
                setIsLoading(false)
                return
            }

            setTimeout(() => {
                sendMessageMutation()
                    .then(async (data) => {
                        setIsLoading(false)
                        settext('')
                        setselectedMedia(null)
                        setreplyingTo(null)
                        setpublicUrl_("")
                    })
                    .catch((error) => {
                        console.info({ error })
                        setIsLoading(false)
                        settext('')
                        setselectedMedia(null)
                        setreplyingTo(null)
                        setpublicUrl_("")
                    })
            }, 2000);
        } catch (error) {
            setIsLoading(false)
        }
    }

    // WHEN USER PRESSES REPLIED MESSAGE THEY ARE TO GO TO THAT MESSAGE
    const goToRepliedMessage = (id: number) => {
        const index = chatMessages.findIndex((item) => item?.id == id);

        if (index !== -1) {

            if (flatlistRef.current) {
                flatlistRef.current.scrollToIndex({
                    index,
                    animated: true, // Optional: Add smooth scrolling animation
                });
            }
        } else {
            console.warn(`Item "${id}" not found in data.`);
            fetchingMoreRef.current = true
            fetchingRepliedMessage.current = true
            console.info(paginationRef.current);
            messagesQuery.refetch({
                programId: program?.id,
                pagination: {
                    limit: 20,
                    page: currentPageRef.current + 1,
                    orderBy: [
                        {
                            column: "created_at",
                            direction: OrderByDirection.Desc
                        }
                    ]
                },
                historyMessageId: id
            }).then((res) => {
                currentPageRef.current = res.data.getProgramMessages.meta?.page
                paginationRef.current = res.data.getProgramMessages.meta

                setchatMessages([...chatMessages, ...res.data.getProgramMessages.data as ChatMessage[]])
                setTimeout(() => {
                    flatlistRef.current?.scrollToEnd()
                    const index_ = chatMessages.findIndex((item) => item?.id == fetchingRepliedMessage.current);
                    if (index_ !== -1) {

                        if (flatlistRef.current) {
                            flatlistRef.current.scrollToIndex({
                                index_,
                                animated: true, // Optional: Add smooth scrolling animation
                            });
                        }
                    }
                    fetchingRepliedMessage.current = false
                }, 1000);

                fetchingMoreRef.current = false
            }).catch((error) => {
                fetchingMoreRef.current = false
                fetchingRepliedMessage.current = false
                console.info(error)
            });
        }

    }


    const margin = { marginBottom: Platform.OS == 'ios' ? keyboardStatus ? 55 : 0 : keyboardStatus ? 0 : 0 }


    return (
        <>
            <SafeView backgroundColor={Colors.BACKGROUND}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                    style={{ flex: 1 }}
                >
                    <View style={styles.chatContainer}>
                        <FlatList
                            ref={flatlistRef}
                            data={chatMessages}
                            keyExtractor={(item, index) => index.toString()}
                            inverted
                            style={styles.list}
                            renderItem={({ item, index }) => (
                                <ChatBubble
                                    item={item}
                                    onImagePress={(media: string) => onPressImage(media)}
                                    onReplyPress={() => setreplyingTo(item)}
                                    goToRepliedMessage={goToRepliedMessage}
                                />
                            )}
                            onEndReachedThreshold={1}
                            onEndReached={() => handleGetMoreMessages()}
                            ListFooterComponent={fetchingMore ? <ActivityIndicator size="small" color={Colors.WHITE} /> : null}
                            onScrollToIndexFailed={(info) => {
                                console.warn(`Failed to scroll to index ${info.index}`);
                                // Handle the failure, e.g., try scrolling to a nearby index
                            }}
                        />

                    </View>

                    {/* INPUT */}
                    <View>

                        <View style={styles.rowContainer}>
                            {
                                selectedMedia &&
                                <ImageBackground
                                    source={{ uri: selectedMedia.uri }}
                                    style={[styles.imgBg, { marginLeft: '5%' }]}
                                    imageStyle={styles.img}
                                >
                                    <TouchableOpacity
                                        hitSlop={{ top: 10, left: 10, bottom: 1, right: 10 }}
                                        onPress={() => setselectedMedia(null)}
                                        style={styles.crossbtn}>
                                        <Entypo name='cross' color={Colors.BLACK} size={15} />
                                    </TouchableOpacity>

                                </ImageBackground>
                            }
                            {/* SPERATOR */}
                            {
                                (selectedMedia && replyingTo)
                                &&
                                <View style={styles.saperator}>
                                </View>
                            }

                            {/* REPLYING TO */}
                            {
                                replyingTo &&
                                <View style={styles.replyContainer}>

                                    <View style={styles.replyContext}>
                                        {
                                            replyingTo?.mediaUrl &&
                                            <ImageBackground
                                                source={{ uri: replyingTo.mediaUrl }}
                                                style={[styles.imgBg, { marginRight: 10, }]}
                                                imageStyle={styles.img}
                                            >
                                            </ImageBackground>
                                        }
                                        <View style={[styles.replyTxtContainer, { marginTop: (replyingTo?.mediaUrl && selectedMedia) ? 0 : 15 }]}>
                                            {
                                                replyingTo?.sender?.firstName &&
                                                <Text allowFontScaling={false} style={styles.txt} >{`replying to ${replyingTo?.sender?.firstName}`}</Text>
                                            }
                                            {
                                                replyingTo?.text &&
                                                <Text allowFontScaling={false} style={styles.txt1} numberOfLines={2}>{replyingTo.text}</Text>
                                            }
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                        onPress={() => setreplyingTo(null)}
                                        style={styles.replyCancelBtn}>
                                        <Entypo name='cross' color={Colors.WHITE} size={20} />
                                    </TouchableOpacity>

                                </View>
                            }
                        </View>

                        <View style={[styles.inputConatiner, margin]}>


                            <TextInput
                                placeholder={'Type Here..'}
                                placeholderTextColor={"#D9D9D990"}
                                style={styles.input}
                                value={text}
                                multiline={true}
                                allowFontScaling={false}
                                onChangeText={(val) => settext(val)}
                            />

                            <View style={styles.btnContainer}>

                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => handleSendMessage()}
                                    disabled={isLoading}
                                >
                                    {isLoading ?
                                        <ActivityIndicator size={'small'} color={Colors.BLACK} />
                                        :
                                        <Entypo name='paper-plane' color={Colors.BLACK} size={20} />}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => pickImage()}
                                    disabled={isLoading}
                                    style={[styles.btn, { backgroundColor: Colors.GRAY_LIGHT }]}
                                >
                                    <Entypo name='image' color={Colors.BLACK} size={20} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                </KeyboardAvoidingView>

                <ImageViewerModal
                    isVisible={isImageModalVisible}
                    onClose={() => setisImageModalVisible(false)}
                    selected={openenMedia}
                />
            </SafeView>
        </>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        backgroundColor: Colors.BLACK,
        justifyContent: 'flex-end'
    },
    inputConatiner: {
        marginTop: 8,
        width: '100%',
        paddingHorizontal: '3%',
        paddingVertical: 10,
        backgroundColor: Colors.BACKGROUND,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        minHeight: 45,
        maxHeight: 100,
        paddingHorizontal: '3%',
        borderRadius: 25,
        fontSize: 14,
        color: Colors.WHITE,
        textAlignVertical: 'center',
        paddingTop: 12,
        overflow: 'hidden'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: Colors.YELLOW,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8
    },
    list: {
        flex: 1,
        paddingHorizontal: '3%'
    },
    imgBg: {
        width: 50,
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',

    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    crossbtn: {
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: Colors.GRAY_LIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    replyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 8,
    },
    replyContext: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    replyCancelBtn: {

    },
    txt: {
        fontSize: 12,
        color: Colors.WHITE,
        textAlign: 'left',
        fontWeight: '600',
        marginBottom: 5
    },
    txt1: {
        fontSize: 14,
        color: Colors.WHITE,
        textAlign: 'left',
    },
    replyTxtContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    saperator: {
        height: 40,
        width: 2,
        backgroundColor: Colors.GRAY_LIGHT,
        marginLeft: 10,
        marginTop: 10
    }
})