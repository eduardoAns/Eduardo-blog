import { UserState } from './';


type UserActionType = 
| { type: '[USER] - editUser' } 


export const userReducer = (state: UserState, action: UserActionType): UserState => {
  switch (action.type) {
    case '[USER] - editUser':
      return { 
        ...state,
        isEditUser:!state.isEditUser 
    };
    default:
      return state;
  }
};