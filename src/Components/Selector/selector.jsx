import React from 'react';
import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

class Selector extends React.Component {
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Select
          style={{ zIndex: 1 }}
          bordered={false}
          defaultValue={this.props.defaultValue}
          optionFilterProp="children"
          suffixIcon={<CaretDownOutlined />}
          options={this.props.options}
        />
      </div>
    );
  }
}

export default Selector;
