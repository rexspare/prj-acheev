import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeView } from '../../shared/components/SafeView'
import { AppText } from '../../shared/components/AppText'
import { Colors } from '../../shared/Constants'
import { AppView } from '../../shared/components/AppView'
import { AppButton } from '../../shared/components/AppButton'
import { useNavigation } from '@react-navigation/native'
import { BaseRoutes } from '../../shared/Routing'
import AsyncStorage from '@react-native-async-storage/async-storage'
const imageHeaderLogo = require(`../../assets/images/icon_text.png`);
const listIcon = require(`../../assets/images/icons/success.png`);

const SubscriptionIndex = () => {
    const navigation = useNavigation()
    const [isLoading, setisLoading] = useState(false)
    const List = [
        {
            id: 1,
            text: "Unlock customized workout routines tailored to your specific athletic goals and progress"
        },
        {
            id: 2,
            text: "Get access to detailed analytics and real-time feedback improve your performance"
        },
        {
            id: 3,
            text: "Enjoy priority access to new features, exclusive content, and 24/7 VIP customer support"
        },
    ]

    const handleSubscribe = async () => {
        setisLoading(true)
        setTimeout(async () => {
            try {
                await AsyncStorage.setItem("@Subscribed", "true")
                navigation.replace(BaseRoutes.HOME)
            } catch (error) {
                navigation.replace(BaseRoutes.HOME)
            } finally {
                setisLoading(false)
            }
        }, 2000);
    }

    return (
        <SafeView backgroundColor={Colors.BACKGROUND}>
            <AppView background padded style={styles.topContainer}>

                <Image source={imageHeaderLogo} style={{ width: 150, resizeMode: 'contain' }} />

                <Text allowFontScaling={false} style={styles.title}>{`Unlock Your Athletic Potential with the\nAcheev Sport Performance App!`}</Text>
            </AppView>

            <View style={styles.main}>

                <ScrollView
                    style={{ width: '100%' }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.row}>
                        <Text allowFontScaling={false} style={styles.price}>$0</Text>
                        <Text allowFontScaling={false} style={styles.period}>/mo</Text>
                    </View>

                    {/* PROS */}
                    {
                        List.map((item, index) => (
                            <View
                                key={index}
                                style={styles.item}
                            >
                                <Image source={listIcon} style={styles.itemIcon} />

                                <Text allowFontScaling={false} style={styles.itemTxt}>{item.text}</Text>
                            </View>
                        ))
                    }

                    <AppButton
                        theme='yellow'
                        style={{ width: '48%', marginTop: 20, height:55 }}
                        onPress={() => handleSubscribe()}>{isLoading ? <ActivityIndicator color={Colors.BLACK} /> : "Subscribe"}</AppButton>


                </ScrollView>
            </View>

        </SafeView>
    )
}

export default SubscriptionIndex

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.BLACK,
        alignItems: 'center'
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: Colors.WHITE,
        textAlign: 'center',
        marginVertical: 10,
        fontFamily: 'Aeonik-Semibold',
        lineHeight: 22,
        fontSize: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginVertical: 30
    },
    price: {
        color: Colors.WHITE,
        fontWeight: "700",
        fontSize: 80
    },
    period: {
        color: Colors.WHITE,
        fontWeight: "500",
        fontSize: 16
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20
    },
    itemIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: Colors.YELLOW,
    },
    itemTxt: {
        color: Colors.WHITE,
        fontSize: 16,
        marginLeft: 10,
        flex: 1
    }
})