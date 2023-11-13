import React from 'react';
import { View, ViewStyle } from 'react-native';

export interface SpacerProps {
    space: number;
    isHorizontal?: boolean;
}

export const Spacer = (props: SpacerProps) => {
    const { space, isHorizontal } = props;
    const style: ViewStyle = {};

    if (isHorizontal) style.width = space;
    else style.height = space;

    return <View style={style} />;
};
