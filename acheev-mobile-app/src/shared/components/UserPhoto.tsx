import React from 'react';

import { Colors } from '../Constants';
import { Image, StyleSheet, View } from 'react-native';
import { User } from '../../types/gqlReactTypings.generated.d';



interface IProps {
  user?: Pick<User, 'fullName' | 'imageUrl' | 'id'>;
  width: number;
}

export const UserPhoto: React.FC<IProps> = ({ user, width }: IProps) => {

  const styles = StyleSheet.create({
    photoBackground: {
      backgroundColor: Colors.RED,
      borderRadius: width / 2,
      borderColor: Colors.RED,
      borderWidth: 1.5,
      height: width,
      marginRight: 10,
      width: width,
    },
    photo: {
      width: "100%",
      height: "100%",
      borderColor: 'white',
      borderRadius: width / 2,
      borderWidth: 1
    },

  });

  return (
    <View style={styles.photoBackground} key={user?.id}>
      <Image style={styles.photo} source={{ uri: user?.imageUrl }} key={user?.id} />
    </View>
  );
}