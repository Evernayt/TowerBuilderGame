import {Image, StyleSheet, Text} from 'react-native';
import Modal from './UI/Modal';
import Button from './UI/Button';
import {COLORS, SIZES} from '../constants/theme';
import {FC} from 'react';
import {IMAGES} from '../constants/images';

interface FinishModalProps {
  isShowing: boolean;
  score: number;
  maxScore: number;
  restart: () => void;
  close: () => void;
}

const FinishModal: FC<FinishModalProps> = ({
  isShowing,
  score,
  maxScore,
  restart,
  close,
}) => {
  const replay = () => {
    restart();
    close();
  };

  return (
    <Modal isShowing={isShowing} zIndex={31}>
      <Image style={styles.logo} source={IMAGES.victoryLogo} />
      <Text
        style={
          styles.text
        }>{`Congratulations!\nThe tower has been built.`}</Text>
      <Text
        style={
          styles.smallText
        }>{`Score: ${score}\nMax score: ${maxScore}`}</Text>
      <Button containerStyle={{marginTop: 24}} text="REPLAY" onPress={replay} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: SIZES.width / 2.5,
    width: SIZES.width / 2.5,
  },
  text: {
    color: COLORS.secondaryText,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  smallText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FinishModal;
