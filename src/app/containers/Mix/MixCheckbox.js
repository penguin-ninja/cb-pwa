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
      <div className="mix-checkbox" onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={!!checked}
          onChange={() => mixStore.toggleCheck(id)}
        />
      </div>
    );
  }
}

export default MixCheckbox;
