import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';
import './SideBar.css';

@inject('sidebarStore')
@observer
class SideBar extends Component {
  render() {
    const { children, className, sidebarStore, type: sidebarType } = this.props;
    const { type } = sidebarStore;
    const CN = cx(className, {
      'page-quick-sidebar-open': type === sidebarType,
      [`page-quick-sidebar--${sidebarType}`]: true
    });

    return (
      <div className={CN}>
        <div className="page-quick-sidebar-wrapper">
          <div className="page-quick-sidebar">
            <a
              className="page-quick-sidebar-toggler"
              onClick={() => sidebarStore.onToggle(null)}
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
