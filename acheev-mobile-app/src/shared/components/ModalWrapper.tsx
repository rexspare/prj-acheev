import React, { ReactNode } from 'react';
import { Text, GestureResponderEvent, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Colors } from '../Constants';
import { useNavigation } from '@react-navigation/native';
import { Modal } from "react-native";

export interface ModalProps {
  show: boolean;

  onCancel?: (event: GestureResponderEvent) => void;
  onCancelText?: string;

  onNext?: (event: GestureResponderEvent) => void;
  onNextText?: string;

  title?: string;
  children?: ReactNode | ReactNode[];
  backgroundColor?: string;

  skipLayout?: boolean;
}

export const ModalWrapper: React.FC<ModalProps> = ({ show, children, onCancel, onCancelText, title, onNext, onNextText, backgroundColor, skipLayout }: ModalProps) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    if (!!skipLayout) {
      return;
    }
    navigation.setOptions({
      headerStyle: {
        backgroundColor: backgroundColor ?? Colors.RED,
        shadowColor: 'transparent',
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: () => onCancel && (
        <TouchableOpacity onPress={onCancel} style={{ marginLeft: 15, marginRight: 200, paddingRight: 50 }}>
          <Text allowFontScaling={false} style={{ color: 'white', fontSize: 16, marginRight: 100, paddingRight: 100, }}>{onCancelText ?? 'cancel'}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => onNext && (
        <TouchableOpacity onPress={onNext} style={{ marginRight: 15 }}>
          <Text allowFontScaling={false} style={{ color: Colors.SEA_FOAM, fontSize: 16 }}>{onNextText ?? 'Next'}</Text>
        </TouchableOpacity>
      ),
      headerTitle: "  " + title,
    });
  });

  if (show === false) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        onCancel?.(null as any);
      }}
    >

      <TouchableOpacity
        style={{ alignSelf: 'flex-start', flex: 1, width: '100%', backgroundColor: 'rgba(0, 0, 0, .8)', paddingTop: 75, paddingBottom: 120, paddingHorizontal: 10, }}
        onPress={onCancel}
      >
        <TouchableOpacity activeOpacity={1} style={{ maxHeight: '90%' }}>
          <KeyboardAvoidingView behavior={"padding"} style={{ maxHeight: "100%" }} keyboardVerticalOffset={100}>

            {children}
          </KeyboardAvoidingView>

        </TouchableOpacity>
      </TouchableOpacity>
    </Modal >
  );
}