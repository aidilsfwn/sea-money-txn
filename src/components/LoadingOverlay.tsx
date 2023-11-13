import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { SCALER } from '../utils/scaler';

interface LoadingProps {
    isVisible: boolean;
}

const LoadingOverlay = ({ isVisible }: LoadingProps) => {
    return (
        <Modal isVisible={isVisible} animationIn={'fadeIn'} animationOut={'fadeOut'}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../../assets/lottie/loading.json')}
                    autoPlay
                    loop
                    style={{ height: SCALER.w(144), width: SCALER.w(144) }}
                />
            </View>
        </Modal>
    );
};

export { LoadingOverlay };
