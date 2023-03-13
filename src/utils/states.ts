let LoginState: boolean;
let reso: (arg0: boolean) => void;
export const getLoginState = async () => {
    return new Promise<boolean>((resolve) => {
        if (LoginState) {
            resolve(LoginState);
        } else {
            reso = resolve;
        }
    });
};

export const setLoginState = (newState: boolean) => {
    if (reso) {
        reso(newState);
    }

    LoginState = newState;
};

