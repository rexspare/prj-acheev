import React from 'react';
import ActionSheet from 'react-native-actionsheet'
import { useEffect, useRef } from 'react'
import { compact } from 'lodash';

interface IProps {
  cancellable?: boolean;
  cancelText?: string;
  onCancel: () => void;
  onPress: (index: number) => void;
  options: IActionSheetOption[];
  show?: boolean;
  title?: string;
}

export interface IActionSheetOption {
  title: string;
  onPress?: () => void;
}

export const AppActionSheet: React.FC<IProps> = ({ cancellable, cancelText, onCancel, onPress, options, show, title }: IProps) => {
  let ref = useRef<ActionSheet>(null);

  useEffect(() => {
    if (show && ref.current) {
      ref.current.show()
    }
  }, [show]);

  let actionOptions = compact(options);
  if (!!cancellable) {
    actionOptions.push({ title: cancelText ?? "Cancel", onPress: undefined });
  }

  const handleOnPress = (index: number) => {
    if (!!cancellable && index === options.length) {
      console.log("cancelling");
      return onCancel();
    }

    actionOptions[index].onPress?.();

    return onPress(index);
  }
  if (!show) {
    return null;
  }

  return (
    <ActionSheet
      ref={ref}
      title={title}
      options={actionOptions.map(item => item.title)}
      cancelButtonIndex={cancellable ? actionOptions.length - 1 : undefined}
      destructiveButtonIndex={cancellable ? actionOptions.length - 1 : undefined}
      onPress={handleOnPress}
    />
  )
}
