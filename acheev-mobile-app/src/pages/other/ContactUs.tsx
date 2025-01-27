import React from 'react';
import { PageHeader } from '../../shared/components/PageHeader';
import { SafeView } from '../../shared/components/SafeView';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { ContinuationButton } from '../../shared/components/ContinuationButton';
const imgLogo = require('../../images/logo.png');


interface IProps {
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  },

});


export const ContactUs: React.FC<IProps> = ({ }: IProps) => {

  return (
    <SafeView scroll scrollBackgroundColor='#F5F2F2' backgroundColor='white'>
      <PageHeader title='Contact us' hideUser wrapperStyle={{ backgroundColor: 'white', paddingBottom: 20 }} hideBorder />

      <View style={{ marginTop: 80, paddingHorizontal: 30 }}>
        <View style={{
          backgroundColor: 'white', padding: 20, borderRadius: 10, shadowColor: 'black',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: .1,
          elevation: 1,
        }}>
          <View style={{
            height: 100, width: 100, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 200, marginTop: -70, shadowOffset: { width: 0, height: 0 },
            shadowOpacity: .08,
            elevation: 1,
          }}>
            <Image source={imgLogo} style={{ height: 80, width: 80 }} />
          </View>

          <Text allowFontScaling={false} style={styles.text}>We&apos;re here to help you:</Text>
          <ContinuationButton title='Email us' onPress={() => Linking.openURL('mailto:team@acheevapp.io')} />
          {/* 
        </View>
      </View>

    </SafeView>
  );
}


