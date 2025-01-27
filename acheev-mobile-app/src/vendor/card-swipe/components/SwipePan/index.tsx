import * as React from 'react';
import { Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  useSharedValue,
} from 'react-native-reanimated';

export enum SWIPE_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
  DEFAULT = 'default',
}

interface Value {
  value: number;
}

interface Props {
  x: Value;
  y: Value;
  originY: Value;
  onSnap: (swipedRight: boolean) => void;
  onStart: () => void;
  onEnd: () => void;
  onChangeDirection: (direction: SWIPE_DIRECTION) => void;
  children: React.ReactNode;
}

type AnimatedGHContext = {
  startX: number;
  startY: number;
  startYOffset: number;  // Track initial Y offset
};

const { width } = Dimensions.get('window');
const VERTICAL_THRESHOLD = 50; // Adjust this value as needed

const SwipePan = ({
  x,
  y,
  onSnap,
  onStart,
  onChangeDirection,
  onEnd,
  originY,
  children,
}: Props) => {
  const directionX = useSharedValue(SWIPE_DIRECTION.DEFAULT);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: AnimatedGHContext) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      ctx.startYOffset = event.y; // Track starting vertical offset

      originY.value = event.y;
      runOnJS(onStart)();
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;

      // Determine swipe direction
      const direction =
        Math.abs(event.translationX) > Math.abs(event.translationY)
          ? (x.value > 0 ? SWIPE_DIRECTION.RIGHT : SWIPE_DIRECTION.LEFT)
          : SWIPE_DIRECTION.DEFAULT;

      // Prevent vertical scrolling if swiping horizontally
      if (direction === SWIPE_DIRECTION.DEFAULT) {
        y.value = ctx.startY; // Reset Y to prevent vertical movement
      }

      if (direction !== directionX.value) {
        directionX.value = direction;
        runOnJS(onChangeDirection)(direction);
      }
    },
    onEnd: (event, ctx) => {
      runOnJS(onEnd)();

      const thresh = width * 0.25; // THIS IS THE THRESHOLD THAT CONTROLS HOW MUCH CARD NEDS TO BE SWIPED BEFORE NEXT CARD APPEARS
      const diff = ctx.startX + event.translationX;
      directionX.value = SWIPE_DIRECTION.DEFAULT;
      runOnJS(onChangeDirection)(directionX.value);

      if (diff > thresh) {
        runOnJS(onSnap)(true);
      } else if (diff < -thresh) {
        runOnJS(onSnap)(false);
      } else {
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      {children}
    </PanGestureHandler>
  );
};

export default SwipePan;
