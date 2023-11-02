import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AnimatedNumber from './UI/AnimatedNumber';
import {FC} from 'react';
import {HEADER_HEIGHT, MARGIN_SZIE, MAX_BOXES} from '../constants/app';
import {IMAGES} from '../constants/images';

interface HeaderProps {
  isPressed: boolean;
  score: number;
  boxesCount: number;
  restart: () => void;
}

const Header: FC<HeaderProps> = ({isPressed, score, boxesCount, restart}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerTextBtn}
          disabled={isPressed}
          onPress={restart}>
          <Text style={[styles.headerText, {flex: 0}]}>REPLAY</Text>
        </TouchableOpacity>
        <AnimatedNumber
          style={[styles.headerText, {textAlign: 'center'}]}
          value={score}
          fixed={0}
          format={'Score: %&%'}
        />
        <Text style={[styles.headerText, {textAlign: 'right'}]}>
          {`${boxesCount}/${MAX_BOXES}`}
        </Text>
      </View>
      <Image style={styles.topImage} source={IMAGES.beam} resizeMode="repeat" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: HEADER_HEIGHT,
    backgroundColor: '#564d47',
  },
  headerTextBtn: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  topImage: {
    height: HEADER_HEIGHT,
    width: '100%',
    marginBottom: MARGIN_SZIE,
  },
});

export default Header;
