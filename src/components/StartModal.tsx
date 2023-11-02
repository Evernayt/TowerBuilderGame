import {Image, StyleSheet, Text} from 'react-native';
import {MAX_BOXES} from '../constants/app';
import Modal from './UI/Modal';
import Button from './UI/Button';
import {COLORS, SIZES} from '../constants/theme';
import {FC} from 'react';
import {IMAGES} from '../constants/images';

interface StartModalProps {
  isShowing: boolean;
  close: () => void;
}

const StartModal: FC<StartModalProps> = ({isShowing, close}) => {
  return (
    <Modal isShowing={isShowing} zIndex={30}>
      <Image style={styles.logo} source={IMAGES.logo} />
      <Text
        style={
          styles.text
        }>{`You need to build a ${MAX_BOXES}-story tower`}</Text>
      <Text
        style={styles.smallText}>{`Tap the screen\nto lower the crane`}</Text>
      <Button containerStyle={{marginTop: 24}} text="OK" onPress={close} />
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

export default StartModal;
