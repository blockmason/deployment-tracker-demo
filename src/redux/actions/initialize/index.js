import listApps from '../list-apps';
import listEnvironments from '../list-environments';

const initialize = () => (dispatch) => {
  dispatch(listApps());
  dispatch(listEnvironments());
};

export default initialize;
