import React, { Component } from 'react';
import getStyle from './style';
import { windowWidthService } from '../../../../data';
import PageTitle from '../../PageTitle';
import Button from '../../../Button';
import QuickNav from './QuickNav';
import Basics from './Basics';
import Settings from './Settings';
import { addData } from '../../../higherOrder';

class _JobDash_needsData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    const { state, props } = this;
    const {
      job,
      areAnyModalsOpen,
      toggleEditJobNameModal,
      toggleDeleteJobModal,
      windowWidth,
      buildSettingsSubPath,
      jobSettingsPath,
      timePagePath,
      dashboardPath
    } = props;

    const style = getStyle(windowWidth);

    return (
      <>
        <PageTitle>JOB:&nbsp;{job.name}</PageTitle>
        <QuickNav
          {...{
            jobSettingsPath,
            timePagePath,
            dashboardPath
          }}
          disabled={areAnyModalsOpen}
          style={style.quickNav}
        />
        <div style={style.contentAreasRow}>
          <Basics
            disabled={areAnyModalsOpen}
            style={style.basics}
            {...{
              toggleEditJobNameModal,
              job,
              toggleDeleteJobModal
            }}
          />
          <Settings
            disabled={areAnyModalsOpen}
            style={style.menu}
            {...{
              job,
              buildSettingsSubPath
            }}
          />
        </div>
      </>
    );
  };
}

const JobDash = addData(_JobDash_needsData, 'windowWidth', windowWidthService);

export default JobDash;