import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('screen');

const baseHeight = 812;
const baseWidth = 375;

/**
 * @param bvSize the BASE VIEW SIZE (baseHeight / baseWidth)
 * @param avSize the ACTUAL VIEW SIZE (height / width)
 * @param dSize the DESIRED VIEW SIZE (param passed by)
 */
const calculateCorrectSize = (bvSize: number, avSize: number, dSize: number) => {
    const baseCorrection = 52;
    const correction = avSize > bvSize ? baseCorrection - (avSize - bvSize) * 0.35 : baseCorrection;
    return ((avSize - correction) / bvSize) * dSize;
};

const h = (size: number) => {
    return PixelRatio.roundToNearestPixel(calculateCorrectSize(baseHeight, height, size));
};

const w = (size: number) => {
    return PixelRatio.roundToNearestPixel(calculateCorrectSize(baseWidth, width, size));
};

const ID = {
    height: h(baseHeight * 0.5333333333),
    width: w(baseWidth * 0.7556719023)
};

const screenResolution = {
    width,
    height
};

export const SCALER = {
    baseHeight,
    baseWidth,
    h,
    w,
    ID,
    screenResolution
};
