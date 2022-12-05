import { BlogState } from './';


type BlogActionType = 
| { type: 'Blog - ActionType' } 
| { type: 'Blog - ' } 


export const BlogReducer = (state: BlogState, action: BlogActionType): BlogState => {
  switch (action.type) {
    case 'Blog - ':
      return { ...state};
    case 'Blog - ActionType':
      return { ...state };
    default:
      return state;
  }
};