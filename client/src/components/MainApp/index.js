import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { userService } from '../../data';
import { api } from './utilities';
import getStyle from './style';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import JobPage from './JobPage';
import NotFoundPage from '../NotFound';
import NewJobModal from './NewJobModal';
// import { addData } from '../higherOrder';

const dashboardPathName = 'dashboard';

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.setNavHeight = this.setNavHeight.bind(this);
    this.toggleNewJobModal = this.toggleNewJobModal.bind(this);
    this.focusNewJobModal = this.focusNewJobModal.bind(this);
    this.newJobInputRef = React.createRef();
    this.state = {
      navHeight: undefined,
      isNewJobModalActive: false
    };
  };

  setNavHeight(navHeight) {
    this.setState({ navHeight });
  };

  toggleNewJobModal(isActiveAfterToggle) {
    this.setState({ isNewJobModalActive: isActiveAfterToggle });
    if (isActiveAfterToggle) {
      setTimeout(
        () => this.focusNewJobModal(),
        250
      );
    }
  };

  focusNewJobModal() {
    this.newJobInputRef.current.focus();
  };

  componentDidMount() {
    console.log(this.newJobInputRef)
    api.auth.test()
    .then(res => {
      const { match, history } = this.props
      if (!userService.getValue() && res.data.user) {
        userService.setUser(res.data.user);
      }
      if (match.isExact) {
        history.push(`${match.path}/${dashboardPathName}`)
      }
    })
    .catch(() => {
      userService.clearUser();
      this.props.history.push('/');
    });
  }

  render() {
    const { props, state, toggleNewJobModal, newJobInputRef } = this;
    const { history, match } = props;
    const { navHeight, isNewJobModalActive } = state;

    const style = getStyle(navHeight);

    const buildPath = subpath => `${match.path}/${subpath}`;

    const redirectToJobPage = jobId => history.push(buildPath(`job/${jobId}`));

    const openNewJobModal = () => toggleNewJobModal(true);

    const renderDashboard = props => (
      <Dashboard {...{ ...props, redirectToJobPage, openNewJobModal }} />
    );

    return (
      <>
        <Navbar
          history={history}
          totalHeight={navHeight}
          reportHeight={this.setNavHeight}
        />
        <div style={style.mainContentArea}>
          <Switch>
            <Route
              path={buildPath(dashboardPathName)}
              render={renderDashboard}
            />
            {/* '/app' is redirected to '/app/dashboard' in componentDidMount. Next route prevents glitchy looking effect of rendering the 404 page momentarily before redirecting to '/app/dashboard'. */}
            <Route
              exact
              path={buildPath('')}
              render={renderDashboard}
            />
            <Route
              path={buildPath('job/:jobId')}
              render={props => <JobPage {...props} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <NewJobModal
          isActive={isNewJobModalActive}
          closeModal={() => toggleNewJobModal(false)}
          redirectToJobPage={redirectToJobPage}
          inputRef={newJobInputRef}
        />
      </>
    );
  };
}

export default MainApp;