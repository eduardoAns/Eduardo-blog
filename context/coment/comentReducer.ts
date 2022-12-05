import { ComentState } from './';


type ComentActionType = 
| { type: '[COMMENT] - postComment' } 
| { type: '[COMMENT] - resetIsComment'}


export const ComentReducer = (state: ComentState, action: ComentActionType): ComentState => {
  switch (action.type) {
    case '[COMMENT] - postComment':
      return { 
        ...state, 
        isComment:true
      
      };
    case '[COMMENT] - resetIsComment':
      return { 
        ...state, 
        isComment:false
      
      };
    default:
      return state;
  }
};