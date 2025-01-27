import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboard = () => {
    const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false)


    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return {
        keyboardStatus,
    };
};

export default useKeyboard;
