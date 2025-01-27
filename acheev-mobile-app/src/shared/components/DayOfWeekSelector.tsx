import React from 'react';
import { Dimensions, TouchableOpacity, View, Text } from 'react-native';
import { DayOfWeek } from '../../types/gqlReactTypings.generated.d';
import { Colors } from '../Constants';


interface IProps {
  daysSelected: DayOfWeek[];
  onDayPressed: (dayOfWeek: DayOfWeek) => () => void;
}

export const DayOfWeekSelector: React.FC<IProps> = ({ daysSelected, onDayPressed }: IProps) => {
  const screenWidth = Dimensions.get("window").width;

  return (


    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
      {Object.values(DayOfWeek).map(dayOfWeek => {
        const isSelected = daysSelected.includes(dayOfWeek);
        return (
          <TouchableOpacity key={dayOfWeek}
            onPress={onDayPressed(dayOfWeek)}
            style={{
              backgroundColor: isSelected ? Colors.BLUE : 'white',
              width: screenWidth / 11, height: screenWidth / 11, borderRadius: 100, borderColor: '#E6E6E6', borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5
            }}>
            <Text allowFontScaling={false} style={{ color: isSelected ? 'white' : '#BDBDBD' }}>{dayOfWeek[0]}</Text>
          </TouchableOpacity>
        )
      })}
    </View>

  );
}