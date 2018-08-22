import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';
import './SideBar.css';

@inject('sidebarStore')
@observer
class SideBar extends Component {
  render() {
    const { children, className, sidebarStore } = this.props;
    const { show } = sidebarStore;
    const CN = cx(className, {
      'page-quick-sidebar-open': show
    });

    return (
      <div className={CN}>
        <div className="page-quick-sidebar-wrapper">
          <div className="page-quick-sidebar">
            <a
              className="page-quick-sidebar-toggler"
              onClick={sidebarStore.onToggle}
            >
              <i className="icon-close" />
            </a>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
