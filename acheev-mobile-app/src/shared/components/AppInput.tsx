import React, { useState, useEffect } from 'react'
import { View, ViewStyle, TextInputIOSProps, KeyboardTypeOptions, StyleSheet, Keyboard, StyleProp, TextStyle, TextInput, TextInputProps, Image, KeyboardType, useColorScheme, Platform } from 'react-native';
import { Colors } from '../Constants';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import moment, { isDate } from 'moment';
import { isNaN } from 'lodash';
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';

const iconDownArrow = require('../../assets/images/icons/down_arrow.png');


export enum InputType {
  DATE,
  TIME,
  NUMBER,
  PHONE,
  TEXT,
  PASSWORD,
  SELECT,
  CODE
}

interface IProps<T> {
  onChange?: (value: T) => void;
  placeholder?: string;
  type: InputType;
  wrapperStyle?: ViewStyle;
  inputStyle?: StyleProp<TextStyle>;
  viewInputStyle?: ViewStyle;
  value?: T;
  editable?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  multiline?: boolean;
  autofocus?: boolean;
  placeholderTextColor?: string;
  rightIcon?: React.ReactNode;
  hideWrapper?: boolean;
  hideTime?: boolean;
  keyboardType?: KeyboardType
  onBlur?: () => void;
}
type InputDate = IProps<Date> & { type: InputType.DATE };
type InputTime = IProps<Date> & { type: InputType.TIME };
type InputNumber = IProps<number> & { type: InputType.NUMBER };
type InputPhone = IProps<string> & { type: InputType.PHONE };
type InputText = IProps<string> & { type: InputType.TEXT };
type InputPassword = IProps<string> & { type: InputType.PASSWORD };
type InputCode = IProps<number> & { type: InputType.CODE };
type InputSelect = IProps<string> & { type: InputType.SELECT; selectionItems: Item[]; selectPlaceholder?: Item };


type IInputProps = InputTime | InputDate | InputNumber | InputPhone | InputText | InputPassword | InputCode | InputSelect;

export const generateSelectionItems = (options: string[]): Item[] => {
  return options.map(option => ({ label: option, value: option }));
}

export const styles = StyleSheet.create({
  iosDateSelector: {
    backgroundColor: 'white',
    marginTop: -15,
    overflow: 'hidden'
  },
  iosDateSelectorCloser: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: -10,
    paddingBottom: 10,
    justifyContent: 'center',
    display: "flex",
    alignItems: 'center'
  },
  cellRoot: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#FFF',
    fontSize: 28,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: Colors.RED,
    borderBottomWidth: 2,
  },
  textInput: {
    color: 'white',
    fontSize: 18,
    fontWeight: "600",
    fontFamily: 'Aeonik',
  },
  wrapper: {
    backgroundColor: '#9C9C9C55',
    color: 'white',
    borderRadius: 5,
    height: 50,
    marginVertical: 6,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
});

export const AppInputStyles = styles;

type CustProps = {
  custProps?: TextInputProps
}

export const AppInput: React.FC<IInputProps & CustProps> = (inputProps: IInputProps & CustProps) => {
  const { editable, onChange, onBlur, viewInputStyle, placeholderTextColor, placeholder, type, hideTime, value, wrapperStyle, minimumDate, maximumDate, multiline, inputStyle, autofocus, custProps, rightIcon, keyboardType, hideWrapper } = inputProps;
  const isDateType = type === InputType.DATE;
  const isTimeType = type === InputType.TIME;
  const [isFocused, setIsFocused] = useState<boolean>();
  const [datePickerOpened, setDatePickerOpened] = React.useState<boolean>(false);
  const theme = useColorScheme()

  useEffect(() => {
    if (datePickerOpened !== undefined) {
      Keyboard.dismiss();
    }

  }, [datePickerOpened])

  const openDatePicker = (bool: boolean) => {
    // console.info("changing date picker state", bool);
    setDatePickerOpened(bool);
  }


  const handleOnChange = (text: string) => {
    if (onChange !== undefined) {
      let value: string | number = text;
      switch (type) {
        case InputType.NUMBER:
        case InputType.CODE:
          value = Number(value);
          if (isNaN(value)) {
            value = 0;
          }
          break;
      }

      (onChange as any)(value)
    }
  }

  const onDateChange = (date?: Date) => {
    if (!!date) {
      handleOnChange(date?.toString());
    } else {
      setTimeout(() => openDatePicker(false), 500);
    }
  }

  const internalValueRenderer = () => {
    if (isDateType && !!value) {
      return !!hideTime ? new Date(value).toLocaleDateString() : new Date(value).toLocaleString(undefined);
    } if (!!value && type === InputType.NUMBER) {
      if (value == undefined || isNaN(value)) {
        return '';
      }
    }

    return value;
  };

  const getInputItem = () => {
    const isDate = (isDateType || isTimeType);
    const onDateTouch = () => isDate ? openDatePicker(true) : undefined;
    switch (type) {
      case InputType.SELECT:
        const selectionItems = inputProps.type === InputType.SELECT ? inputProps.selectionItems : [];
        const selectPlaceholder = inputProps.type === InputType.SELECT ? inputProps.selectPlaceholder : undefined;
        // console.info("Internal", internalValueRenderer());
        return (
          <>
            <RNPickerSelect
              onValueChange={handleOnChange}
              value={`${internalValueRenderer()}`}
              placeholder={selectPlaceholder}
              style={{
                inputAndroid: {
                  width: '100%',
                  ...viewInputStyle, ...styles.textInput, minWidth: '100%', height: 40, color: 'white'
                },
                viewContainer: { ...(Platform.OS == 'ios' ? {} : { height: 30, justifyContent: 'center' }) },
                inputIOS: { width: '100%', ...styles.textInput, ...viewInputStyle, minWidth: '100%', minHeight: '100%', },
                iconContainer: { justifyContent: 'center', alignItems: 'center', height: '100%', },
              }}
              items={selectionItems}
              Icon={() => {
                return Platform.OS == 'ios' ? <Image source={iconDownArrow} style={{ width: 16, height: 16, resizeMode: 'contain' }} /> : <></>;
              }}
              pickerProps={{
                dropdownIconColor: "#FFFFFF"
              }}
            />
          </>
        )
      default:
        return (
          <>
            <TouchableOpacity onPress={onDateTouch} activeOpacity={1}>
              <TextInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  onBlur?.();
                }}
                keyboardType={keyboardType ?? getKeyboardType(type)}
                placeholder={placeholder}
                multiline={multiline}
                value={`${internalValueRenderer() ?? ""}`}
                placeholderTextColor={placeholderTextColor ?? '#aaa'}
                onChangeText={isDate ? undefined : handleOnChange}
                onTouchStart={onDateTouch}
                style={[{ height: multiline ? '100%' : undefined, width: multiline ? '100%' : undefined, minWidth: '100%', minHeight: hideWrapper ? 'auto' : '100%', maxHeight: hideWrapper ? 'auto' : undefined }, styles.textInput, inputStyle]}
                secureTextEntry={type === InputType.PASSWORD}
                textContentType={getIosContentType(type)}
                autoFocus={autofocus}
                {...(custProps ?? {})}
                keyboardAppearance={theme == 'dark' ? 'dark' : 'light'}
                allowFontScaling={false}
              >
              </TextInput>
            </TouchableOpacity>
          </>
        )
    }
  }


  return (
    <>
      {(type !== InputType.TIME) && (
        !!hideWrapper ?
          getInputItem()
          :
          <View style={{
            flexDirection: 'row',
            ...styles.wrapper,
            justifyContent: !!rightIcon ? 'space-between' : 'flex-start',
            alignItems: 'center',
            borderColor: isFocused ? Colors.RED : '#d3d3d3',
            ...wrapperStyle,
          }}>
            {getInputItem()}
            {rightIcon}
          </View>
      )
      }
      {(isDateType || isTimeType) &&
        <>
          <DatePicker
            mode="datetime"
            modal={true}
            open={datePickerOpened}
            date={moment(isDate(value) ? value : new Date()).toDate()}
            onConfirm={onDateChange}
            onCancel={() => openDatePicker(false)}
            style={styles.iosDateSelector}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            androidVariant="iosClone"
          />
        </>
      }

    </>
  );
}

function getIosContentType(type: InputType): TextInputIOSProps['textContentType'] {
  switch (type) {
    case InputType.PASSWORD:
      return 'password';
    case InputType.PHONE:
      return 'telephoneNumber';
    default:
      return 'none';
  }
}

function getKeyboardType(type: InputType): KeyboardTypeOptions {
  switch (type) {
    case InputType.CODE:
    case InputType.NUMBER:
      return 'numeric';
    case InputType.PHONE:
      return 'phone-pad';
    default:
      return 'default';
  }
}