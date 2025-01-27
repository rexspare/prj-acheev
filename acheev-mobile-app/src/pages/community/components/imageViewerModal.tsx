import { Modal, StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../shared/Constants';
import { SafeView } from '../../../shared/components/SafeView';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ImageZoom, Zoomable } from '@likashefqet/react-native-image-zoom';
import FastImage from 'react-native-fast-image'
import { ChatMessage } from '../../../types/gqlReactTypings.generated.d';

interface IImageViewerModalProps {
    isVisible: boolean;
    onClose: Function;
    selected: string | null;
}

const ImageViewerModal = (props: IImageViewerModalProps) => {
    const { isVisible, onClose, selected } = props

    return (
        <Modal
            visible={isVisible}
            onRequestClose={() => onClose()}
            transparent={true}
            style={{ flex: 1 }}
        >
            <SafeView style={styles.main}>
                <View style={styles.main}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            hitSlop={{
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10
                            }}
                            onPress={() => onClose()}
                        >
                            <AntDesign name='close' color={Colors.WHITE} size={25} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <Zoomable
                            minScale={1}
                            maxScale={5}
                            doubleTapScale={3}
                            isSingleTapEnabled
                            isDoubleTapEnabled
                            style={styles.container}
                        >
                            <FastImage
                                source={{
                                    uri: selected || "",
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.img}
                            />
                        </Zoomable>
                    </View>

                </View>
            </SafeView>

        </Modal>
    )
}

export default ImageViewerModal

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: Colors.BACKGROUND,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: '5%'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})