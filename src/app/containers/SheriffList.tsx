import React from 'react';
import { connect } from 'react-redux';
import {
  Sheriff, IdType
} from '../api';
import { RootState } from '../store';
import { getSheriffList } from '../modules/sheriffs/actions';
import {
  sheriffsForCurrentLocation,
  sheriffListLoading
} from '../modules/sheriffs/selectors';
import SheriffCard from '../components/SheriffCard/SheriffCard';
import SheriffProfileModal from './SheriffProfileModal';
import Loading from '../components/Loading';

export interface SheriffListProps {
  sheriffs?: Sheriff[];
  loading?: boolean;
  SheriffListComponent?: React.ReactType<{ sheriffs?: Sheriff[], SheriffRenderer?: React.ReactType<Sheriff> }>;
  SheriffRenderer?: React.ReactType<Sheriff>;
  sheriffsSelector?: (state: RootState) => Sheriff[];
}

export interface SheriffListStateProps {
  
}

interface SheriffListDispatchProps {
  showSheriffProfileModal: (sheriffId: IdType) => void;
  fetchSheriffList: () => void;
}

type CompositeProps = SheriffListProps & SheriffListDispatchProps & SheriffListStateProps;
class SheriffList extends React.Component<CompositeProps> {
  componentWillMount() {
    const { fetchSheriffList } = this.props;
    fetchSheriffList();
  }

  render() {
    const {
      sheriffs = [],
      loading = true,
      SheriffRenderer,
      showSheriffProfileModal
    } = this.props;

    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        {sheriffs.map(sheriff => (
          <div
            key={sheriff.badgeNo}
          >
            {SheriffRenderer && <SheriffRenderer {...sheriff} />}
            {!SheriffRenderer &&
              <SheriffCard
                sheriff={sheriff}
                onClick={() => showSheriffProfileModal(sheriff.id)}
              />
            }
          </div>
        ))}
      </div>
    );
  }
}

export default connect<SheriffListStateProps, SheriffListDispatchProps, SheriffListProps, RootState>(
  (state, {sheriffsSelector = sheriffsForCurrentLocation}) => ({
    sheriffs: sheriffsSelector(state),
    loading: sheriffListLoading(state)
  }),
  {
    fetchSheriffList: getSheriffList,
    showSheriffProfileModal: SheriffProfileModal.ShowAction
  }
)(SheriffList);