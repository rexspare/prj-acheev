import React, { useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SwipeButton = ({
  title = "Swipe Me",
  containerStyle,
  buttonStyle,
  textStyle,
  onSwipe = () => alert('Swiped!'),
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: animatedValue,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        const swipeThreshold = SCREEN_WIDTH * 0.4; // Adjust threshold
        if (gestureState.dx > swipeThreshold) {
          Animated.timing(animatedValue, {
            toValue: SCREEN_WIDTH,
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            onSwipe(); // Trigger callback
            resetPosition(); // Reset to initial state
          });
        } else {
          resetPosition(); // Snap back if not swiped enough
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0, SCREEN_WIDTH],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.button,
          buttonStyle,
          { transform: [{ translateX }] },
        ]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  button: {
    width: 120,
    height: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SwipeButton;
