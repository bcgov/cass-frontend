import * as React from 'react';
import {
    DutyRecurrence,
    DaysOfWeek
} from '../api';
import { Badge } from 'react-bootstrap';
import moment from 'moment';

export interface AssignmentDefaultRecurrenceDetailsProps {
    data: DutyRecurrence;
}

export default class AssignmentDefaultRecurrenceDetails 
    extends React.PureComponent<AssignmentDefaultRecurrenceDetailsProps, any> {
        getTimeDisplay(timeString: string) {
            return moment(timeString, 'HH:mm:sszz').format('h:mm a');
        }
    
        render() {
        const { data: { daysBitmap, startTime, endTime, sheriffsRequired } } = this.props; 
        const dayDisplay = DaysOfWeek.getDisplayValues(daysBitmap).join(', ');
        const startTimeString = this.getTimeDisplay(startTime.toString());
        const endTimeString = this.getTimeDisplay(endTime.toString());

        return (
            <div>
                <strong>{dayDisplay}</strong> - {startTimeString} to {endTimeString}{' '}
                <Badge>{sheriffsRequired}</Badge>
                <br />
            </div>
        );
    }
}
