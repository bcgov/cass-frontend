import { createSelector } from 'reselect';
import { RootState } from '../../store';
import * as assignmentRequests from './requests/assignments';
import * as assignmentDutyRequests from './requests/assignmentDuties';
import {
    Assignment,
    AssignmentDuty,
    IdType,
    AssignmentMap
} from '../../api/Api';
import { 
    AssignmentDutyMap, 
    CourtroomMap, 
    JailRoleMap,
    RunMap,
    AlternateAssignmentMap 
} from '../../api';
import { 
    isCourtAssignment, 
    isJailAssignment,
    isEscortAssignment,
    isOtherAssignment 
} from '../../api/utils';
import { courtroomMapRequest } from '../courthouse/requests/courtrooms';
import { jailRoleMapRequest } from '../courthouse/requests/jailRoles';
import { runMapRequest } from '../courthouse/requests/runs';
import { alternateAssignmentTypeMapRequest } from '../courthouse/requests/alternateAssignmentTypes';

// Assignments
export const allAssignments = createSelector(
    assignmentRequests.assignmentMapRequest.getData,
    courtroomMapRequest.getData,
    jailRoleMapRequest.getData,
    runMapRequest.getData,
    alternateAssignmentTypeMapRequest.getData,
    (map: AssignmentMap = {}, courtRooms: CourtroomMap = {}, jailRoles: JailRoleMap = {}, runs: RunMap = {}, altAssignmentTypes: AlternateAssignmentMap = {}): Assignment[] => {
        const list: Assignment[] = Object.keys(map).map((k, i) => map[k]);
        return list.map(a => {
            if (isCourtAssignment(a)) {
                a.title = courtRooms[a.courtroomId] ? courtRooms[a.courtroomId].name : 'Courtroom Not Found';
            } else if (isJailAssignment(a)) {
                a.title = jailRoles[a.jailRoleId] ? jailRoles[a.jailRoleId].title : 'Jail Role Not Found';
            } else if (isEscortAssignment(a)) {
                a.title = runs[a.runId] ? runs[a.runId].description : 'Run Not Found';
            } else if (isOtherAssignment(a)) {
                a.title = altAssignmentTypes[a.otherAssignmentTypeId] 
                    ? altAssignmentTypes[a.otherAssignmentTypeId].description : 'Other Type Not Found';
            }
            return a;
        });
    });
export const isLoadingAssignments = assignmentRequests.assignmentMapRequest.getIsBusy;
export const assignmentsError = assignmentRequests.assignmentMapRequest.getError;

export const getAssignment = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map = assignmentRequests.assignmentMapRequest.getData(state) as Assignment;
        return map[id];
    }
    return null;
};

// Assignment Duties
export const allAssignmentDuties = createSelector(
    assignmentDutyRequests.assignmentDutyMapRequest.getData,
    (map: AssignmentDutyMap = {}): AssignmentDuty[] => {
        const list: AssignmentDuty[] = Object.keys(map).map((k, i) => map[k]);
        return list;
    });
export const isLoadingAssignmentDuties = assignmentDutyRequests.assignmentDutyMapRequest.getIsBusy;
export const assignmentDutiesError = assignmentDutyRequests.assignmentDutyMapRequest.getError;

export const getAssignmentDuty = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map: AssignmentDutyMap = assignmentDutyRequests.assignmentDutyMapRequest.getData(state);
        return map[id] as AssignmentDuty;
    }
    return undefined;
};