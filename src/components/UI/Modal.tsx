import {FC, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/theme';

interface ModalProps {
  isShowing: boolean;
  children: ReactNode;
  zIndex?: number;
}

const Modal: FC<ModalProps> = ({isShowing, children, zIndex = 999}) => {
  return isShowing ? (
    <View style={[styles.container, {zIndex}]}>
      <View style={styles.panel}>{children}</View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 24,
  },
  panel: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
});

export default Modal;
