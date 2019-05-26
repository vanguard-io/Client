import { combineReducers } from 'redux';
import CpuMetericReducer from './cpuMetericReducer';

export default combineReducers({
    meterics: CpuMetericReducer
})
