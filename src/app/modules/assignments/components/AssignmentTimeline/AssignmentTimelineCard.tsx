import * as React from 'react'
import {
    SheriffAssignment,
    ASSIGNMENT_TYPES
} from '../../../../api/index';
import AssignmentDragSource from '../../dragdrop/AssignmentDragSource';
import {
    OverlayTrigger,
    Popover,
    Button,
    Glyphicon
} from 'react-bootstrap';
import { default as AssignmentView } from '../AssignmentView';

export interface AssignmentTimelineCardProps {
    onClick?: () => void;
    assignment: SheriffAssignment;
    currentGroupId: number;
    onDropped?: () => void;
}
export default class AssignmentTimelineCard extends React.PureComponent<AssignmentTimelineCardProps, any>{
    render() {
        const { assignment, currentGroupId, onDropped } = this.props;
        const { assignmentType, courtRoom, gateNumber, assignmentCourt,sheriffIds=[],sherrifsRequired=1 } = assignment;

        const showAssignmentDetails = (
            <Popover id="popover-trigger-focus">
                <AssignmentView assignment={assignment} />
            </Popover>
        );


        let backgroundColor = "";
        if (assignmentType === ASSIGNMENT_TYPES.courtSecurity) {
            backgroundColor = "#008080";
        } else if (assignmentType === ASSIGNMENT_TYPES.escortServices) {
            backgroundColor = "#993399";
        } else if (assignmentType === ASSIGNMENT_TYPES.documentServices) {
            backgroundColor = "#990000";
        } else if (assignmentType === ASSIGNMENT_TYPES.gateSecurity) {
            backgroundColor = "#e65c00";
        } else {
            backgroundColor = "#0066cc";
        }
         
        const progressValue = (sheriffIds.length / Number(sherrifsRequired))*100;

        return (
            <AssignmentDragSource
                id={assignment.id}
                currentGroupId={currentGroupId}
                endDrag={() => onDropped && onDropped()}>
                <div style={{ display: 'flex',justifyContent:'space-between', flexFlow: 'column nowrap', lineHeight: "15px", backgroundColor, width: "100%", height: "100%", position: "absolute" }}>
                    <div style={{ flex: '1' }}>
                        <OverlayTrigger trigger="focus" placement="right" overlay={showAssignmentDetails}>
                            <Button style={{ color: "#FFF", padding: 0 }} bsStyle="link" bsSize="medium"><strong>{assignmentType} {assignmentCourt && <Glyphicon glyph="asterisk" />}</strong></Button>
                        </OverlayTrigger>
                    </div>
                    <div style={{ flex: '1' }}>
                        <i>{courtRoom} {gateNumber}</i>
                    </div>
                    <div style={{position:"absolute",right:2,bottom:0}}>
                        {   progressValue >= 100 
                            ? <Glyphicon glyph="ok"/> 
                            : <span>{sheriffIds.length}/{Number(sherrifsRequired)}</span>
                        }
                    </div>
                </div>
            </AssignmentDragSource>
        );
    }
}
