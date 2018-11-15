import React, { Component } from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';

@inject('mixStore')
@observer
class MixRow extends Component {
  render() {
    const { children, className, mixStore, rowId, ...rest } = this.props;
    const cn = cx('rt-tr', className, {
      'mix-row--selected': rowId === mixStore.selectedId
    });

    return (
      <div
        className={cn}
        role="row"
        onClick={() => mixStore.selectMix(rowId)}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

export default MixRow;
