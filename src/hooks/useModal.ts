import {useState} from 'react';

export interface IModal {
  isShowing: boolean;
  open: () => void;
  close: () => void;
}

const useModal = (isShowingDefault: boolean = false): IModal => {
  const [isShowing, setIsShowing] = useState<boolean>(isShowingDefault);

  const open = () => {
    setIsShowing(true);
  };

  const close = () => {
    setIsShowing(false);
  };

  return {
    isShowing,
    open,
    close,
  };
};

export default useModal;
