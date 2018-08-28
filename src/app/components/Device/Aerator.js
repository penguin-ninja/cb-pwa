import React, { Component } from 'react';
import { Group, Image } from 'react-konva';
import deviceHoc from 'app/hocs/deviceHoc';
import AeratorImg from 'img/devices/Aerator/stick.png';

class Aerator extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      stick: null
    };
  }

  componentWillMount() {
    const image = new window.Image();
    image.src = AeratorImg;
    image.onload = () => {
      this.setState({
        stick: image
      });
    };
  }

  render() {
    const { x, y, width, height } = this.props;
    const { stick } = this.state;

    return (
      <Group x={x} y={y} width={width} height={height} name="aerator-1">
        <Image image={stick} width={54} height={88} />
      </Group>
    );
  }
}

export default deviceHoc(Aerator);
