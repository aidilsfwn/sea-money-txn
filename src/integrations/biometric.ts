import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import Toast from 'react-native-toast-message';

export enum BIOMETRIC_SENSOR {
    TOUCH_ID = 'Touch ID',
    FACE_ID = 'Face ID',
    FINGERPRINT = 'Biometrics'
}

const rnBiometrics = new ReactNativeBiometrics();

const isSensorAvailable = async () => {
    const sensor = await rnBiometrics.isSensorAvailable().then((sensor) => {
        if (sensor.available) {
            return true;
        }
    });
    return sensor !== undefined;
};

const getAvailableSensor = async () => {
    return await rnBiometrics.isSensorAvailable().then((sensor) => {
        if (sensor.available) {
            if (sensor.biometryType === BiometryTypes.TouchID) {
                return BIOMETRIC_SENSOR.TOUCH_ID;
            }
            if (sensor.biometryType === BiometryTypes.FaceID) {
                return BIOMETRIC_SENSOR.FACE_ID;
            }
            if (sensor.biometryType === BiometryTypes.Biometrics) {
                return BIOMETRIC_SENSOR.FINGERPRINT;
            }
        }
    });
};

const biometricPrompt = async () => {
    return await rnBiometrics
        .simplePrompt({ promptMessage: `Do you want to allow “SeaMoneyTxn” to use ${await getAvailableSensor()}?` })
        .then(async (result) => {
            if (result.success) {
                return result.success;
            } else {
                Toast.show({ type: 'error', text1: 'Oops!', text2: result.error });
            }
        })
        .catch((error) => {
            console.log({ error });
            Toast.show({ type: 'error', text1: error.code, text2: error.message });
        });
};

class Biometrics {
    public isSensorAvailable = async () => {
        const res = await isSensorAvailable();
        return res;
    };
    public biometricPrompt = async () => {
        const res = await biometricPrompt();
        return res;
    };
}

export const BiometricsAPI = new Biometrics();
