import Toast from 'react-native-root-toast';

let toast;


export const toastShort = (content) => {
    if (toast !== undefined) {
        Toast.hide(toast);
    }
    toast = Toast.show(content.toString(), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
};




export const toastLong = (content, toasttype) => {
    if (toast !== undefined) {
        Toast.hide(toast);
    }
    if (toasttype == 'bottom') {
        toasttype = Toast.positions.BOTTOM
    } else {
        toasttype = Toast.positions.CENTER
    }
    toast = Toast.show(content.toString(), {
        duration: Toast.durations.LONG,
        position: toasttype,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
};