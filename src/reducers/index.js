import { combineReducers } from 'redux';
import ProfileReducer from './ProfileReducer';
import AuthReducer from './AuthReducer';
import NewStoryReducer from './NewStoryReducer';
import HomeReducer from './HomeReducer';
import PhotoGrid from './PhotoGridReducer';

export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  newStory: NewStoryReducer,
  home: HomeReducer,
  photoGrid: PhotoGrid,
});
