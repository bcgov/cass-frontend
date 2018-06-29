import React from 'react';
import { SheriffDropResult, DraggedSheriff } from './SheriffDragSource';
import {
    default as dropTargetFactory,
} from '../infrastructure/DragDrop/dropTargetFactory';
import ItemTypes from '../infrastructure/DragDrop/ItemTypes';
import { Sheriff } from '../api';

type DroppableItem = Sheriff;

const GenericDropTarget = dropTargetFactory<DroppableItem, void>(ItemTypes.SHERIFF);

interface SheriffDropTargetProps {
    canDropItem?: (item: DroppableItem) => boolean;
    onDropItem: (item: DroppableItem) => void;
    style?: React.CSSProperties;
    computeStyle?: (status: { isActive: boolean, isOver: boolean, canDrop: boolean }) => React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

export default class SheriffDropTarget extends React.PureComponent<SheriffDropTargetProps> {

    canDropItem(sheriff: DraggedSheriff) {
        return true;
    }

    onDropItem(dragged: DraggedSheriff): SheriffDropResult {
        return {
            ...dragged
        };
    }

    render() {
        const {
            canDropItem,
            onDropItem,
            style,
            className,
            onClick,
            computeStyle
        } = this.props;

        return (
            <GenericDropTarget
                canDropItem={(a) => canDropItem ? canDropItem(a as DroppableItem) : false}
                onDropItem={(a) => onDropItem && onDropItem(a)}
                style={style}
                className={className}
                onClick={onClick}
                computeStyle={computeStyle}
            >
                {this.props.children}
            </GenericDropTarget>
        );
    }
}