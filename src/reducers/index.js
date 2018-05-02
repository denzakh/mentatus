import { combineReducers } from 'redux'
import user from './user'
import psystatus from './psystatus'

export default combineReducers({
  user,
  psystatus
})