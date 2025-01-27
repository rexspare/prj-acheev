import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AppInputStyles } from './AppInput';
import { LogBox } from 'react-native';
import moment from 'moment';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']); // TODO: Remove when fixed 


export interface ILocation {
  location: string;
  googlePlaceId: string;
  latitude: number;
  longitude: number;
}

interface IProps {
  onChange: (location: ILocation) => void;
  onChangeInputText: (val: string) => void;
  value?: string;
  optional?: boolean;
  placeholder?: string;
}

export const AppLocationInput: React.FC<IProps> = ({ value, onChangeInputText, onChange, placeholder }: IProps) => {
  const [initializedAt] = React.useState<moment.Moment>(moment().add(3, 'seconds'));

  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder ?? 'Your address'}

      // currentLocation={true}
      onPress={(data, details) => {
        const newLocation: ILocation = {
          location: data.description,
          googlePlaceId: data.place_id,
          latitude: details?.geometry.location.lat ?? -1,
          longitude: details?.geometry.location.lng ?? -1
        };

        onChange(newLocation);
        console.log(newLocation);
      }}
      fetchDetails
      styles={{
        container: { ...AppInputStyles.wrapper, height: undefined, paddingVertical: 0, paddingHorizontal: 5, zIndex: 20, borderRadius: 20 },
        textInput: { ...AppInputStyles.textInput, height: 35, borderRadius: 15, },
        textInputContainer: { backgroundColor: 'white', padding: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRadius: 30 }
      }}
      textInputProps={{
        defaultValue: value,
        value, onChangeText: (val) => {
          // Fix weird bug where it starts by firing an empt on-change
          if (val.length > 0 || moment().isAfter(initializedAt)) {
            // console.info({ addressValChange: val });
            onChangeInputText(val);
          }
        }
      }}
      query={{
        key: 'AIzaSyCtgmFavHign-H09GPDd9rEWUkpFtJvchs',
        language: 'en',
      }}
    />
  );
};