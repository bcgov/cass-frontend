import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { default as thunk, ThunkAction as _ThunkAction } from 'redux-thunk'
import { default as api, API } from './api'
import { default as sheriffReducer, SheriffState } from './modules/sheriffs/reducer';
import { default as assignmentReducer, AssignmentModuleState, STATE_KEY as AssignmentModuleStateKey } from './modules/assignments/reducer';
import { default as timelineReducer, TimelineState } from './modules/timeline/reducer';
import { reducer as formReducer } from 'redux-form';

export interface ThunkExtra {
    api: API;
}

export type ThunkAction<T> = (args?: T) => _ThunkAction<any, RootState, ThunkExtra>;

export interface RootState {
    sheriffs: SheriffState;
    assignments: AssignmentModuleState;
    timeline: TimelineState;
}

const reducers = {
    sheriffs: sheriffReducer,
    timeline: timelineReducer,
    form: formReducer
}
reducers[AssignmentModuleStateKey] = assignmentReducer;

const rootReducer = combineReducers(reducers);

let thisWindow: any = window;

const composeEnhancers = thisWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(
        thunk.withExtraArgument({ api })
    )
)

export default createStore(rootReducer, enhancers);