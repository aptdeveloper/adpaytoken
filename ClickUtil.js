
const minClickDelayTime = 2000; 

let lastClickTime = 0;

const noDoubleClick = () => {

    const currentTime = new Date().getTime();

    if (currentTime - lastClickTime > minClickDelayTime) {

        lastClickTime = currentTime;

        return true;

    }

    return false;

};


const resetLastTime = () => {

    lastClickTime = 0;

};

export default { noDoubleClick, resetLastTime };