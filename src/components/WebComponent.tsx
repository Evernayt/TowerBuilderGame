import {FC, useEffect, useRef, useState} from 'react';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {BackHandler} from 'react-native';
import clearUrl from '../helpers/clearUrl';

interface WebComponentProps {
  url: string;
  disableGoBack?: boolean;
}

const WebComponent: FC<WebComponentProps> = ({url, disableGoBack}) => {
  const [canGoBack, setCanGoBack] = useState<boolean>(!disableGoBack);

  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    if (!canGoBack) {
      webViewRef.current?.goBack();
    }
    return true;
  };

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    if (clearUrl(url) === clearUrl(navState.url)) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  };

  return (
    <WebView
      source={{uri: url}}
      ref={webViewRef}
      onNavigationStateChange={onNavigationStateChange}
      setSupportMultipleWindows={false}
    />
  );
};

export default WebComponent;
