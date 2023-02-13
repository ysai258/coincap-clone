import React from 'react';
import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
interface Props {
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
}
class Selector extends React.Component<Props>  {
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
