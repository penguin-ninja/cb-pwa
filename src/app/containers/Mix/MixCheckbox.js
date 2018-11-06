import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Checkbox from 'react-bootstrap/lib/Checkbox';

@inject('mixStore')
@observer
class MixCheckbox extends Component {
  render() {
    const { mixStore, id } = this.props;
    const checked = mixStore.checked.get(id);

    return (
      <div className="mix-checkbox">
        <Checkbox checked={!!checked} onChange={() => {}} />
      </div>
    );
  }
}

export default MixCheckbox;
