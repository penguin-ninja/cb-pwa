import React from 'react';
import { Group, Text } from 'react-konva';

export default function deviceHoc(WrappedComponent) {
  return class extends React.Component {
    renderEdit() {
      const { x, y, width, height } = this.props;

      return <Text x={x + width + 20} y={y + height - 10} text="Edit" />;
    }

    render() {
      return (
        <Group>
          <WrappedComponent {...this.props} />
          {this.renderEdit()}
        </Group>
      );
    }
  };
}
