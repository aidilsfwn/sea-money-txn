import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacer } from './Spacer';

const SafeAreaSpacer = ({ type }: { type: 'top' | 'bottom' }) => {
    const insets = useSafeAreaInsets();

    if (type === 'top') return <Spacer space={insets.top} />;
    if (type === 'bottom') return <Spacer space={insets.bottom} />;

    return null;
};

export { SafeAreaSpacer };
