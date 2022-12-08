import { ComentState } from './';


type ComentActionType = 
| { type: '[COMMENT] - commentListChange'}
| { type: '[COMMENT] - commentEditChange'}
| { type: '[COMMENT] - getIdClickComment', payload:number}




export const ComentReducer = (state: ComentState, action: ComentActionType): ComentState => {
  switch (action.type) {
    case '[COMMENT] - commentListChange':
      return { 
        ...state, 
        isComment:!state.isComment
      
      };
    case '[COMMENT] - commentEditChange':
      return { 
        ...state, 
        isEditComment:!state.isEditComment
        
      };
    case '[COMMENT] - getIdClickComment':
      return { 
        ...state, 
        IdClickComment:action.payload
        
      };
    default:
      return state;
  }
};