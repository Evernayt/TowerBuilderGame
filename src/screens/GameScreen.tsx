import {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import {FinishModal, Header, StartModal} from '../components';
import {
  HEADER_HEIGHT,
  MARGIN_SZIE,
  MAX_BOXES,
  BOX_HEIGHT,
  BOX_WIDTH,
  BIG_BOX_HEIGHT,
  BIG_BOX_WIDTH,
  CABLE_WIDTH,
  INITIAL_RANGE,
  BOX_SAFE_ZONE,
  BIG_BOX_LEFT_DANGER_ZONE,
  BIG_BOX_RIGHT_DANGER_ZONE,
  INITIAL_DURATION,
} from '../constants/app';
import useModal from '../hooks/useModal';
import {IMAGES} from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MAX_SCORE_KEY} from '../constants/storage';

const GameScreen = () => {
  const [score, setScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<number[]>([]);
  const [duration, setDuration] = useState<number>(INITIAL_DURATION);
  const [forceReset, setForceReset] = useState<boolean>(false);
  const [isLose, setIsLose] = useState<boolean>(false);

  const boxValue = useRef(new Animated.ValueXY({x: MARGIN_SZIE, y: 0})).current;
  const bigBoxValue = useRef(new Animated.Value(0)).current;
  const boxRef = useRef(null);

  const startModal = useModal(true);
  const finishModal = useModal(false);

  useEffect(() => {
    AsyncStorage.getItem(MAX_SCORE_KEY).then(value => {
      setMaxScore(Number(value));
    });
  }, []);

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(boxValue.x, {
          toValue: SIZES.width - BOX_WIDTH - MARGIN_SZIE,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(boxValue.x, {
          toValue: MARGIN_SZIE,
          duration,
          useNativeDriver: true,
        }),
      ]),
    );

    if (isPressed) {
      anim.stop();
    } else {
      anim.start();
    }
  }, [isPressed, forceReset]);

  useEffect(() => {
    if (boxes.length === 0) {
      setIsLose(false);
    }
  }, [boxes]);

  const handlePress = () => {
    setIsPressed(true);
    const boxesCount = boxes.length;
    const lastBox = boxes[0];

    Animated.timing(boxValue.y, {
      toValue: INITIAL_RANGE - BOX_HEIGHT * boxesCount,
      duration,
      useNativeDriver: true,
    }).start(() => {
      //@ts-ignore
      boxRef.current?.measure((_fx, _fy, _width, _height, px) => {
        boxValue.setValue({x: MARGIN_SZIE, y: 0});

        let isLose = false;
        if (boxesCount === 0) {
          isLose =
            px <= BIG_BOX_LEFT_DANGER_ZONE || px >= BIG_BOX_RIGHT_DANGER_ZONE;
        } else {
          const boxLeftDangerZone = lastBox - BOX_SAFE_ZONE;
          const boxRightDangerZone = lastBox + BOX_SAFE_ZONE;
          isLose = px <= boxLeftDangerZone || px >= boxRightDangerZone;
        }

        if (isLose) {
          lose();
        } else {
          const difference = calcDifference(
            Math.floor(lastBox),
            Math.floor(px),
          );
          const newScore = score + 100 - difference;
          if (boxesCount !== 0) {
            setScore(newScore);
          }

          setBoxes([px, ...boxes]);

          if (boxesCount === MAX_BOXES - 1) {
            finishModal.open();
            if (maxScore < newScore) {
              setMaxScore(newScore);
              AsyncStorage.setItem(MAX_SCORE_KEY, newScore.toString());
            }
          } else {
            setIsPressed(false);
            setDuration(prevState =>
              prevState >= 500 ? prevState - 100 : prevState,
            );
          }
        }
      });
    });
  };

  const lose = () => {
    shakeBigBox();

    let counter = boxes.length + 1;
    while (counter > 0) {
      setTimeout(() => {
        setBoxes(p => [...p.slice(0, counter - 1)]);
      }, counter * 500);

      counter -= 1;
    }

    setIsLose(true);
    setScore(0);
    setIsPressed(false);
    setDuration(INITIAL_DURATION);
    setForceReset(prevState => !prevState);
  };

  const restart = () => {
    setBoxes([]);
    setIsPressed(false);
    setScore(0);
    setDuration(INITIAL_DURATION);
    setForceReset(prevState => !prevState);
  };

  const calcDifference = (lastX: number, newX: number) => {
    const max = Math.max(lastX, newX);
    const min = Math.min(lastX, newX);
    const coef = BOX_WIDTH / (max - min);
    const difference = 100 / coef;
    return Math.floor(difference);
  };

  const shakeBigBox = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bigBoxValue, {
          toValue: -2,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(bigBoxValue, {
          toValue: 2,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(bigBoxValue, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      {iterations: boxes.length * 2 || 2},
    ).start();
  };

  const animatedBox = {
    transform: [{translateX: boxValue.x}, {translateY: boxValue.y}],
  };

  const animatedbigBox = {transform: [{translateX: bigBoxValue}]};

  return (
    <ImageBackground style={styles.container} source={IMAGES.bg}>
      <StartModal isShowing={startModal.isShowing} close={startModal.close} />
      <FinishModal
        isShowing={finishModal.isShowing}
        score={score}
        maxScore={maxScore}
        restart={restart}
        close={finishModal.close}
      />
      <Header
        isPressed={isPressed}
        score={score}
        boxesCount={boxes.length}
        restart={restart}
      />
      <TouchableWithoutFeedback
        disabled={isLose || isPressed}
        onPress={handlePress}>
        <View style={styles.gameContainer}>
          <Animated.View style={[styles.boxContainer, animatedBox]}>
            <Image ref={boxRef} style={styles.box} source={IMAGES.box} />
            <View style={[styles.cable, {left: MARGIN_SZIE}]} />
            <View
              style={[
                styles.cable,
                {left: BOX_WIDTH - MARGIN_SZIE * 2 + CABLE_WIDTH},
              ]}
            />
          </Animated.View>
          <View>
            {boxes.map((box, index) => (
              <Image
                style={[styles.box, {transform: [{translateX: box}]}]}
                source={IMAGES.box}
                key={index}
              />
            ))}
            <Animated.Image
              style={[styles.bigBox, animatedbigBox]}
              source={IMAGES.bigBox}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gameContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  boxContainer: {
    width: BOX_WIDTH,
    top: HEADER_HEIGHT * 2 + MARGIN_SZIE,
  },
  box: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    resizeMode: 'contain',
  },
  cable: {
    backgroundColor: '#333333',
    width: CABLE_WIDTH,
    height: SIZES.height,
    position: 'absolute',
    top: -SIZES.height,
    zIndex: -1,
  },
  bigBox: {
    width: BIG_BOX_WIDTH,
    height: BIG_BOX_HEIGHT,
    alignSelf: 'center',
  },
});

export default GameScreen;
