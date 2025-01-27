import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../Constants';
import { globalStyles } from '../GlobalStyles';

interface IProps {
  title: string;
  rightAction?: { title: string; action: (() => void) };
  rightActionNode?: { node: React.ReactNode };
  rightInfo?: string;
  children?: React.ReactNode | React.ReactNode[];
  marginBottom?: boolean;
}

export const CardSection: React.FC<IProps> = ({ title, children, marginBottom, rightAction, rightActionNode, rightInfo }: IProps) => {
  return (
    <>
      <View style={{ padding: 20, paddingVertical: 15 }} >
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Text allowFontScaling={false} style={{ fontWeight: '600', fontSize: 16 }}>{title}</Text>
          {!!rightAction &&
            <TouchableOpacity onPress={rightAction.action}>
              <Text allowFontScaling={false} style={{ fontWeight: '600', fontSize: 16, color: Colors.MAROON }}>{rightAction.title}</Text>
            </TouchableOpacity>
          }
          {!!rightActionNode &&
            rightActionNode.node
          }
          {!!rightInfo &&
            <Text allowFontScaling={false} style={{ ...globalStyles.smallText }}>{rightInfo}</Text>
          }

        </View>
        {children}
      </View >
      {!!marginBottom &&
        <View style={{ width: '100%', height: 10, backgroundColor: '#F5F2F2', }} />
      }
    </>
  );
}