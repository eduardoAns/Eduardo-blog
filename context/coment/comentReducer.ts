import { ComentState } from './';


type ComentActionType = 
| { type: '[COMMENT] - updateListComment'}
| { type: '[COMMENT] - changeEditComment'}
| { type: '[COMMENT] - getIdClickComment', payload:number}
| { type: '[COMMENT] - editComment'}





export const ComentReducer = (state: ComentState, action: ComentActionType): ComentState => {
  switch (action.type) {
    case '[COMMENT] - updateListComment':
      return { 
        ...state, 
        isUpdateListComent:!state.isUpdateListComent
      
      };
    case '[COMMENT] - changeEditComment':
      return { 
        ...state, 
        isChangeEditComment:!state.isChangeEditComment
        
      };
    case '[COMMENT] - getIdClickComment':
      return { 
        ...state, 
        IdClickComment:action.payload
        
      };
    case '[COMMENT] - editComment':
      return { 
        ...state, 
        isEditComment:!state.isEditComment
        
      };
    default:
      return state;
  }
};