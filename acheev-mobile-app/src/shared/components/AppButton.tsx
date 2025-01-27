import { omit } from 'lodash';
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Colors } from '../Constants';
import { AppText, AppTextProps } from './AppText';

interface Props extends TouchableOpacityProps {
  textProps?: AppTextProps;
  theme?: 'yellow' | 'black' | 'yellow-outline';
}


export const AppButton: React.FC<Props> = (props) => {
  const { textProps } = props;
  const [baseStyleTouchable, baseStyleText] = React.useMemo(() => {
    switch (props.theme) {
      case 'black':
        return [
          { borderColor: 'white', backgroundColor: 'transparent', paddingVertical: 12, borderWidth: 2, borderStyle: 'solid' }, { color: 'white' }
        ];
      case 'yellow':
        return [{ borderColor: 'white', backgroundColor: Colors.YELLOW, paddingVertical: 14, }, { color: 'black' }];
      case 'yellow-outline':
        return [{ borderColor: Colors.YELLOW, backgroundColor: 'transparent', borderWidth: 2, paddingVertical: 12, }, { color: Colors.YELLOW }];
      default:
        return [{}, {}];
    }

  }, []);

  return (
    <TouchableOpacity {...omit(props, 'children')}
      style={[{ display: 'flex', alignSelf: 'auto', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 },
      props.style, baseStyleTouchable]}
    >
      <AppText bold={true} {...textProps} style={[{ fontSize: 20, lineHeight: 22 }, textProps?.style, baseStyleText]}>{props.children}</AppText>
    </TouchableOpacity>
  );
}