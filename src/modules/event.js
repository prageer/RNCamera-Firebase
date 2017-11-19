import {createAction, handleActions} from 'redux-actions';
import update from 'react-addons-update';

// action type
const ADD_PHOTO = 'event/ADD_PHOTO';
const INIT_LOAD = 'event/INIT_LOAD';
const INIT_LOAD_FLAG = 'event/INIT_LOAD_FLAG';
const COMMENT_FLAG = 'event/COMMENT_FLAG';

// action creators
export const addPhoto = createAction(ADD_PHOTO);
export const initLoad = createAction(INIT_LOAD);
export const initLoadFlag = createAction(INIT_LOAD_FLAG);
export const commentFlag = createAction(COMMENT_FLAG);

// initial states
const initialState = {
  events: [
  ],
  initLoading: false,
  commentLoading: false
};

// reducers
export default handleActions({
  [COMMENT_FLAG]: (state, action) => {
    const {flag} = action.payload;
    
    return update(state, {
      commentLoading: {        
        $set: flag
      }
    });
  },
  [INIT_LOAD_FLAG]: (state, action) => {
    const {flag} = action.payload;
    
    return update(state, {
      initLoading: {        
        $set: flag
      }
    });
  },
  [INIT_LOAD]: (state, action) => {
    const {item} = action.payload;
    
    return update(state, {
      events: {        
        $set: item
      },
      initLoading: {
        $set: false
      }
    });
  },
  [ADD_PHOTO]: (state, action) => {
    const {url, id} = action.payload;
    
    return update(state, {
      events: {        
        $push: [{
          'url': url,
          'id': id
        }]
      }
    });
  }
}, initialState);
