import { Dimensions, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Colors } from '../../../shared/Constants';
import { AppText } from '../../../shared/components/AppText';
import { getFontSize } from '../../../utils/myutil';
import { AppButton } from '../../../shared/components/AppButton';
const { width, height } = Dimensions.get('window');
const cross = require(`../../../assets/images/icons/cross.png`);

const ITEM_WIDTH = width * 0.9 - 30

interface IQuestionModalProps {
    visible: boolean;
    onClose: Function;
    data?: any;
    onComplete: Function;
}

interface IQuestion {
    id: number,
    question: string;
    options: number[] | string[];
    noScaling?: boolean;
}

const RANGE_COLORS = [
    "#D5222B",
    "#EA1C25",
    "#ED3B22",
    "#F27823",
    "#F7B317",
    "#F7DD03",
    "#C8DC28",
    "#8BC840",
    "#4CB645",
    "#13AD48",
]

const QuestionaireModal = (props: IQuestionModalProps) => {

    const {
        visible = false,
        onClose = () => { },
        data = {},
        onComplete = () => { }
    } = props

    const QUESTIONS: IQuestion[] = [
        {
            id: 1,
            question: "How are you feeling today, both physically and mentally?",
            options: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            id: 2,
            question: "What’s your energy level on a scale of 1-10?",
            options: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            id: 3,
            question: "Rate your soreness or discomfort on a scale of 1-10, 10 being very sore and uncomfortable.",
            options: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        {
            id: 4,
            question: "How many days before your next game or major competition?",
            options: [
                "1 day", "2 days", "3 days", "4 days", "5 days", "No Competition"
            ],
            noScaling: true
        },


    ]

    const [selectedOptions, setselectedOptions] = useState<any>(QUESTIONS.map((item) => { return { id: item.id, selected: null } }))
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef<FlatList>();
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / ITEM_WIDTH);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != QUESTIONS.length) {
            const offset = nextSlideIndex * ITEM_WIDTH;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };


    const goToPrevSlide = () => {
        const nextSlideIndex = currentSlideIndex - 1;
        if (nextSlideIndex > -1) {
            const offset = nextSlideIndex * ITEM_WIDTH;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };


    const onSelectOption = (id: number, opt: string | number) => {
        setselectedOptions(selectedOptions.map((item: any) => {
            return item.id == id ? {
                id: item.id, selected: opt
            } : item
        }))
    }

    const checkIsSelected = (id: number, opt: string | number) => {
        let isSelected = false

        selectedOptions.forEach((item: any, index: number) => {
            if (item.id == id && item.selected == opt) {
                isSelected = true
            }
        });

        return isSelected
    }



    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={() => onClose()}
            style={{ flex: 1 }}
        >
            <View style={styles.main}>

                <View style={styles.container}>

                    <View style={styles.headingContainer}>
                        <Text  allowFontScaling={false} style={styles.txt1} >{currentSlideIndex == 0 && "Personalize your workout"}</Text>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
                            onPress={() => goToNextSlide()}
                            style={styles.crossContainer}
                        >
                            <Image source={cross} style={styles.cross} />
                        </TouchableOpacity>

                    </View>
                    {
                        currentSlideIndex == 0 &&
                        <Text allowFontScaling={false} style={styles.txt2} >This will tailor the sets, reps, and intensity to best suit you.</Text>
                    }

                    <View style={{
                        width: '100%',
                    }}>
                        <FlatList
                            ref={ref}
                            onMomentumScrollEnd={updateCurrentSlideIndex}
                            data={QUESTIONS}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            pagingEnabled
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.item}>
                                        <Text allowFontScaling={false} style={styles.questionTxt}>{`${index + 1}. ${item.question}`}</Text>
                                        <View style={item?.noScaling != true && {
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            width: '100%',
                                            marginTop: 30
                                        }}>
                                            {
                                                item.options.map((opt: any, idx: number) => (
                                                    item?.noScaling == true ?
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            key={idx}
                                                            style={styles.row}
                                                            onPress={() => onSelectOption(item.id, opt)}
                                                        >

                                                            <TouchableOpacity
                                                                activeOpacity={0.8}
                                                                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                                                style={styles.radioBtn}
                                                                onPress={() => onSelectOption(item.id, opt)}
                                                            >
                                                                {checkIsSelected(item.id, opt) && <View style={styles.filler}></View>}
                                                            </TouchableOpacity>

                                                            <Text allowFontScaling={false} style={styles.optTxt}>{opt}</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            key={idx}
                                                            style={[
                                                                styles.scaleBtn,
                                                                {
                                                                    backgroundColor: RANGE_COLORS[idx],
                                                                    borderColor: checkIsSelected(item.id, opt) ? Colors.WHITE : RANGE_COLORS[idx]
                                                                },
                                                            ]}
                                                            onPress={() => onSelectOption(item.id, opt)}
                                                        >
                                                            <Text allowFontScaling={false} style={[styles.optTxt2, { fontSize: getFontSize(4), }]}>{opt}</Text>
                                                        </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    </View>
                                )
                            }}
                        />

                    </View>

                    <View style={styles.btnContainer}>
                        <AppButton
                            theme='yellow'
                            style={{ width: '45%' }}
                            onPress={() => goToPrevSlide()}>Previous</AppButton>
                        <AppButton
                            theme='yellow'
                            style={{ width: '45%' }}
                            onPress={() => goToNextSlide()}>{currentSlideIndex == QUESTIONS.length - 1 ? "Finish" : "Next"}</AppButton>
                    </View>

                </View>

            </View>

        </Modal>
    )
}

export default QuestionaireModal

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    container: {
        backgroundColor: Colors.BLACK,
        width: '90%',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        borderWidth: 1 / 4,
        borderColor: Colors.YELLOW
    },
    txt1: {
        color: Colors.WHITE,
        textAlign: 'left',
        fontSize: getFontSize(4),
        fontFamily: 'Aeonik-Bold',
        fontWeight: '600'
    },
    txt2: {
        color: Colors.GRAY_TEXT,
        textAlign: 'left',
        fontSize: getFontSize(3),
        marginTop: 5,
        marginBottom: 15
    },
    item: {
        width: ITEM_WIDTH,
        minHeight: 110,
        paddingBottom: 10
    },
    questionTxt: {
        color: Colors.WHITE,
        textAlign: 'left',
        fontSize: getFontSize(3.4),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: '5%'
    },
    optTxt: {
        color: Colors.GRAY_TEXT,
        textAlign: 'left',
        fontSize: getFontSize(3.4),
    },
    optTxt2: {
        color: Colors.WHITE,
        textAlign: 'left',
        fontSize: getFontSize(3.4),
        fontWeight: "700",
    },
    radioBtn: {
        width: getFontSize(3.4),
        height: getFontSize(3.4),
        borderWidth: 1 / 2,
        borderColor: Colors.YELLOW,
        borderRadius: getFontSize(3.4),
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
    filler: {
        width: '100%',
        height: "100%",
        borderRadius: 50,
        backgroundColor: Colors.YELLOW
    },
    btnContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        alignSelf: 'center'
    },
    scaleBtn: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        paddingVertical: 5
    },
    headingContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    crossContainer: {
        borderWidth: 1,
        borderColor: Colors.GRAY_LIGHT,
        borderRadius: 30,
        padding: 5
    },
    cross: {
        width: 10,
        height: 10,
        tintColor: Colors.GRAY_LIGHT
    }
})  