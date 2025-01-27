import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { Colors } from '../../../shared/Constants'
import moment from 'moment'
import { ChatMessage, useDeleteMessageMutation } from '../../../types/gqlReactTypings.generated.d'
import { AuthContext } from '../../../shared/auth/Authentication'
import FastImage from 'react-native-fast-image'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Popover, { PopoverMode } from 'react-native-popover-view';
import Entypo from 'react-native-vector-icons/Entypo'
const { width, height } = Dimensions.get('screen')

interface IChatBubbleProps {
    item: ChatMessage;
    onImagePress: Function;
    onReplyPress: Function;
    goToRepliedMessage: Function;
}

const ChatBubble = (props: IChatBubbleProps) => {
    const { item, onImagePress, onReplyPress = () => { }, goToRepliedMessage = () => { } } = props
    const { currentUser, signOut } = React.useContext(AuthContext);
    const popoverRef = useRef<Popover>();
    const commonStyles = commonStyles_(item?.senderId == currentUser?.id)

    const [deletMessageMutation] = useDeleteMessageMutation({
        variables: {
            messageId: item?.id
        }
    })

    const renderMdeia = (media: string, mediaType: string) => {
        return (
            <>
                {mediaType == 'image' ?
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onImagePress(media)}
                    >
                        <FastImage
                            source={{
                                uri: media,
                                priority: FastImage.priority.high
                            }}
                            style={commonStyles.img}
                        />
                    </TouchableOpacity>
                    :
                    <></>
                }
            </>
        )
    }

    const handleReply = () => {
        onReplyPress(item)
        popoverRef?.current?.requestClose()
    }

    const handleDelete = () => {
        deletMessageMutation({ variables: { messageId: item.id } })
            .then(async (data) => {
                popoverRef?.current?.requestClose()
            })
            .catch((error) => console.info({ error }))
    }

    const handleGoToMessage = (id: number | undefined) => {
        goToRepliedMessage(id)
    }

    return (
        <>
            <Popover
                ref={popoverRef}
                popoverStyle={{ backgroundColor: 'transparent' }}
                from={(sourceRef, showPopover) => (
                    <>
                        {
                            item?.senderId == currentUser?.id ?
                                <View style={styles.main}>

                                    {/* REPLY */}
                                    {
                                        (item?.replyTo && item?.isDeleted != true) &&
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            // onPress={() => handlleGoToMessage(item?.replyTo?.id)}
                                            onPress={() => handleGoToMessage(item?.replyTo?.id)}
                                            style={commonStyles.replyContainer}>
                                            <Text allowFontScaling={false} style={commonStyles.txt2}>{`Replying to ${item?.replyTo.sender.firstName}`}</Text>
                                            {item.replyTo?.text && <Text allowFontScaling={false} style={commonStyles.txt}>{item.replyTo?.text}</Text>}
                                            {item.replyTo?.mediaUrl && renderMdeia(item.replyTo?.mediaUrl, item.replyTo?.mediaType || 'image')}
                                        </TouchableOpacity>
                                    }
                                    {/* END */}

                                    <TouchableOpacity
                                        ref={sourceRef}
                                        activeOpacity={0.9}
                                        onLongPress={() => item?.isDeleted != true ? showPopover() : null}
                                        style={styles.bubble}>
                                        {
                                            item?.isDeleted == true ?
                                                <Text allowFontScaling={false} style={styles.deletedTxt}>message has been deleted</Text>
                                                :
                                                <>
                                                    {item?.text && <Text allowFontScaling={false} style={styles.txt}>{item.text}</Text>}
                                                    {item.mediaUrl && renderMdeia(item?.mediaUrl, item.mediaType || "image")}
                                                </>
                                        }
                                    </TouchableOpacity>
                                    <Text allowFontScaling={false} style={styles.date}>{moment(item.createdAt).format("DD-MM-YYYY")}</Text>
                                </View>
                                :
                                <View style={styles2.main}>
                                    <Text allowFontScaling={false} style={styles2.username}>{item.sender.firstName} {item?.sender?.isCoach && <Text><FontAwesome6 name='user-astronaut' size={10} color={Colors.GRAY_LIGHT} />(Coach)</Text>}</Text>

                                    {/* REPLY */}
                                    {
                                        (item?.replyTo && item?.isDeleted != true) &&
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => handleGoToMessage(item?.replyTo?.id)}
                                            style={commonStyles.replyContainer}>
                                            <Text allowFontScaling={false} style={commonStyles.txt2}>{`Replying to ${item?.replyTo.sender.firstName}`}</Text>
                                            {item.replyTo?.text && <Text allowFontScaling={false} style={commonStyles.txt}>{item.replyTo?.text}</Text>}
                                            {item.replyTo?.mediaUrl && renderMdeia(item.replyTo?.mediaUrl, item.replyTo?.mediaType || 'image')}
                                        </TouchableOpacity>
                                    }
                                    {/* END */}

                                    <TouchableOpacity
                                        ref={sourceRef}
                                        activeOpacity={0.9}
                                        onLongPress={() => item?.isDeleted != true ? showPopover() : null}
                                        style={styles2.bubble}>
                                        {
                                            item?.isDeleted == true ?
                                                <Text allowFontScaling={false} style={styles2.deletedTxt}>message has been deleted</Text>
                                                :
                                                <>
                                                    {item?.text && <Text allowFontScaling={false} style={styles2.txt}>{item.text}</Text>}
                                                    {item.mediaUrl && renderMdeia(item?.mediaUrl, item.mediaType || "image")}
                                                </>
                                        }
                                        <Text allowFontScaling={false} style={styles2.date}>{moment(item.createdAt).format("DD-MM-YYYY")}</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                    </>
                )}>
                <View style={commonStyles.popUpMain}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleReply()}
                        style={commonStyles.stylespopUpItem}
                    >
                        <Entypo name='reply' color={Colors.BLACK} size={20} />
                        <Text allowFontScaling={false} style={commonStyles.popUpItemTxt}>Reply</Text>
                    </TouchableOpacity>
                    {
                        item?.senderId == currentUser?.id &&
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleDelete()}
                            style={commonStyles.stylespopUpItem}
                        >
                            <Entypo name='trash' color={Colors.BLACK} size={20} />
                            <Text allowFontScaling={false} style={commonStyles.popUpItemTxt}>Delete</Text>
                        </TouchableOpacity>
                    }
                </View>
            </Popover>


        </>
    )
}

export default ChatBubble

const commonStyles_ = (isUserSender: boolean) => StyleSheet.create({
    img: {
        width: width * 0.7,
        height: width * 0.7,
        marginTop: 10,
        borderRadius: 10
    },
    replyContainer: {
        maxWidth: width * 0.8,
        ...(isUserSender ? { right: 15 } : { left: 15 }),
        bottom: -10,
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: Colors.GRAY_LIGHT,
        shadowColor: Colors.GRAY_LIGHT,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    txt: {
        color: Colors.BLACK,
        fontSize: 14,
        fontWeight: '400'
    },
    txt2: {
        color: Colors.BLACK,
        fontSize: 9,
        fontWeight: '400',
        marginBottom: 5
    },
    popUpMain: {
        backgroundColor: Colors.BG_MAIN,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20
    },
    stylespopUpItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40
    },
    popUpItemTxt: {
        color: Colors.BLACK,
        fontSize: 16,
        paddingHorizontal: 15,
        fontWeight: '500'
    },
})

const styles = StyleSheet.create({
    main: {
        width: '100%',
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    bubble: {
        maxWidth: width * 0.8,
        padding: 12,
        borderRadius: 15,
        borderBottomRightRadius: 0,
        backgroundColor: Colors.YELLOW,
        shadowColor: Colors.YELLOW,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    txt: {
        color: Colors.BLACK,
        fontSize: 14,
        fontWeight: '400'
    },
    date: {
        color: Colors.WHITE,
        fontSize: 10,
        textAlign: 'right',
        marginTop: 5,
        width: "100%",
        borderWidth: 2,
    },
    replymain: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        right: 20,
        bottom: -20
    },
    deletedTxt: {
        color: Colors.GRAY_TEXT,
        fontSize: 14,
        fontWeight: '400'
    },
})

const styles2 = StyleSheet.create({
    main: {
        width: '100%',
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    bubble: {
        maxWidth: width * 0.8,
        padding: 12,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        backgroundColor: Colors.BACKGROUND,
        shadowColor: Colors.BACKGROUND,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    txt: {
        color: Colors.WHITE,
        fontSize: 14,
        fontWeight: '400'
    },
    date: {
        color: Colors.WHITE,
        fontSize: 10,
        textAlign: 'right',
    },
    username: {
        color: Colors.WHITE,
        fontSize: 10,
        textAlign: 'right',
        marginBottom: 5,
        marginLeft: 10
    },
    deletedTxt: {
        color: Colors.GRAY_MUTED,
        fontSize: 14,
        fontWeight: '400'
    },
})