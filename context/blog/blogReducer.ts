import { BlogState } from './';


type BlogActionType = 
| { type: 'Blog - isSaving' } 


export const BlogReducer = (state: BlogState, action: BlogActionType): BlogState => {
  switch (action.type) {
    case 'Blog - isSaving':
      return { 
        ...state,
        isSaving: !state.isSaving
      };
    default:
      return state;
  }
};