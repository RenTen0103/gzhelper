import {extendTheme, useColorMode} from 'native-base';
import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();

const config = {
    useSystemColorMode: false,
    initialColorMode: colorScheme
};

const colors = {
    primary: {
        50: '#EEF2F6',
        100: '#CFD9E7',
        200: '#B1C1D8',
        300: '#92A9C9',
        400: '#7491B9',
        500: '#5578AA',
        600: '#446088',
        700: '#334866',
        800: '#223044',
        900: '#111822',
    },
};

export default extendTheme({config, colors});

