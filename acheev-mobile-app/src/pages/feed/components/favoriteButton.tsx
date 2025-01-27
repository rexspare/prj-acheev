import React from 'react';
import { Image, TouchableOpacity } from "react-native";

const iconFavorite = require(`../../../assets/images/icons/favorite.png`);
const iconFavorited = require(`../../../assets/images/icons/favorited.png`);

interface Props {
  onPress?: () => void;
  value: boolean;
  width?: number
  height?: number
}

export function FavoriteButton({ onPress, value, width = 22.4, height = 20 }: Props) {
  const [isFavorited, setIsFavorited] = React.useState<boolean>(value);

  const onHandlePress = () => {
    setIsFavorited(!isFavorited);
    onPress?.();
  }

  React.useEffect(() => {
    setIsFavorited(value);
  }, [value]);

  return (
    <TouchableOpacity onPress={() => onHandlePress()}>
      <Image source={isFavorited ? iconFavorited : iconFavorite} style={{ width, height }} />
    </TouchableOpacity>
  );
}
