import React from 'react';
import { TouchableOpacity, View, ViewProps, ScrollView } from "react-native";
import { AppText } from '../../../shared/components/AppText';
import { ModalProps, ModalWrapper } from '../../../shared/components/ModalWrapper';
import { AppButton } from '../../../shared/components/AppButton';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from '../../../shared/Constants';

const iconPlusCircle = require(`../../../assets/images/icons/plus_circle.png`);

interface Props extends ViewProps {
  modalProps: ModalProps;
  onComplete: () => void;

  programFacetId: number;
  programId: number;
}

export const ProgramFacetAddCalendar: React.FC<Props> = ({ onComplete, modalProps, }: Props) => {

  const newModalProps: ModalProps = {
    ...modalProps,
    skipLayout: true,
    children: (
      <View style={{ backgroundColor: '#241F21', padding: 15, borderRadius: 20, marginBottom: 50, maxHeight: '100%', }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 30 }}>
          <AppText style={{ color: 'white', fontSize: 18 }} semiBold>Add to calendar</AppText>
        </View>

        <ScrollView>
          <TouchableOpacity activeOpacity={100}>
          </TouchableOpacity>
        </ScrollView>

        <View style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, marginBottom: 30 }}>
          <CalendarPicker
            onDateChange={() => undefined}
            textStyle={{
              color: 'white',
              fontWeight: '600',
              fontFamily: 'Aeonik'
            }}
            scaleFactor={400}
            previousTitleStyle={{ paddingLeft: 25, color: Colors.YELLOW }}
            nextTitleStyle={{ paddingRight: 25, color: Colors.YELLOW }}
            selectedDayColor={Colors.YELLOW}
          />
        </View>


        <View style={{ flexDirection: 'row' }}>
          <AppButton theme='yellow-outline' style={{ flex: 1 }} onPress={modalProps.onCancel}>Cancel</AppButton>
          <View style={{ width: 20 }} />
          <AppButton theme='yellow' style={{ flex: 1 }} onPress={modalProps.onCancel}>Add</AppButton>
        </View>
      </View>
    )
  }
  return (
    <ModalWrapper {...newModalProps} />
  )
}