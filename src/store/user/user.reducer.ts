
import { UserData } from "../../utils/firebase/firebase.utils";
import { AnyAction } from "redux";
import { signInSuccess, signInFailed, signOutFailed, signUpFailed, signOutSuccess  } from "./user.action";

export type UserState = {
    readonly currentUser: null | UserData;
    readonly isLoading: Boolean;
    readonly error: null | Error;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {

    if (signInSuccess.match(action)){
        return {
            ...state,
            currentUser: action.payload
        }
    }
    if (signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)){
        return {
            ...state,
            error: action.payload
        }
    }
    if (signOutSuccess.match(action)){
        return {
            ...state,
            currentUser: null
        }
    }

    return state;
}

