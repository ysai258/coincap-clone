import React from 'react';
import { Table, Spin, Empty, message, Divider, Button, } from 'antd';
import { connect } from 'react-redux';
import { fetchDataRequest } from '../../Services/action';
import Icon, { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ColumnType, SortOrder } from 'antd/es/table/interface';
import "./Home.css";

const { Text } = Typography;
const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  notation: 'compact',
  compactDisplay: 'short'
});
const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  notation: 'compact',
  compactDisplay: 'short'
});

const renderTitle = (title: string, key: string, sortColumns: {
  column: ColumnType<any>;
  order: SortOrder;
}[] | undefined) => {
  const sortedColumn = sortColumns?.find(({ column }) => column.key === key);
  return (
    <div>
      {title}
      {sortedColumn ? (
        sortedColumn.order === "ascend" ? (
          <CaretUpOutlined />
        ) : (
          <CaretDownOutlined />
        )
      ) : null}
    </div>
  )
}
const columns: ColumnsType<any> = [
  {
    title: ({ sortColumns }) => renderTitle('Rank', 'rank', sortColumns),
    dataIndex: 'rank',
    key: 'rank',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.rank - b.rank
  },
  {
    title: ({ sortColumns }) => renderTitle('Name', 'name', sortColumns),
    dataIndex: 'name',
    key: 'name',
    render: (value: any, record: any) => (
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <Icon component={() => <ImgIcon record={record} />} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 8 }}>
          <Text>{value}</Text>
          <Text style={{ fontSize: '0.8em', opacity: 0.7 }}>{record.symbol}</Text>
        </div>
      </div>
    ),
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: ({ sortColumns }) => renderTitle('Price', 'priceUsd', sortColumns),
    dataIndex: 'priceUsd',
    key: 'priceUsd',
    render: (value: any, record: any) => (
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <Text>{Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
      </div>
    ),
    sorter: (a, b) => a.priceUsd - b.priceUsd
  },
  {
    title: ({ sortColumns }) => renderTitle('Market Cap', 'marketCapUsd', sortColumns),
    dataIndex: 'marketCapUsd',
    key: 'marketCapUsd',
    render: (value: any, record: any) => {
      value = moneyFormatter.format(Number(value)).toLocaleLowerCase()
      return (
        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <Text>{value}</Text>
        </div>);
    },
    sorter: (a, b) => a.marketCapUsd - b.marketCapUsd,
  },
  {
    title: ({ sortColumns }) => renderTitle('VWAP (24Hr)', 'vwap24Hr', sortColumns),
    dataIndex: 'vwap24Hr',
    key: 'vwap24Hr',
    render: (value: any, record: any) => (
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <Text>{Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
      </div>
    ),
    sorter: (a, b) => a.vwap24Hr - b.vwap24Hr,
  },
  {
    title: ({ sortColumns }) => renderTitle('Supply', 'supply', sortColumns),
    dataIndex: 'supply',
    key: 'supply',
    render: (value: any, record: any) => {
      value = numberFormatter.format(Number(value)).toLocaleLowerCase()
      return (
        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <Text>{value}</Text>
        </div>);
    },
    sorter: (a, b) => a.supply - b.supply
  },
  {
    title: ({ sortColumns }) => renderTitle('Volumen (24Hr)', 'volumeUsd24Hr', sortColumns),
    dataIndex: 'volumeUsd24Hr',
    key: 'volumeUsd24Hr',
    render: (value: any, record: any) => {
      value = moneyFormatter.format(Number(value)).toLocaleLowerCase()
      return (
        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <Text>{value}</Text>
        </div>);
    },
    sorter: (a, b) => a.volumeUsd24Hr - b.volumeUsd24Hr
  },
  {

    title: ({ sortColumns }) => renderTitle('Change (24Hr)', 'changePercent24Hr', sortColumns),
    dataIndex: 'changePercent24Hr',
    key: 'changePercent24Hr',
    render: (value: any, record: any) => {
      var isNeg = Number(value) < 0
      value = numberFormatter.format(Number(value)).toLocaleLowerCase()
      return (
        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <Text style={{ color: isNeg ? 'red' : 'green' }}>{`${value}%`}</Text>
        </div>);
    },
    sorter: (a, b) => a.changePercent24Hr - b.changePercent24Hr

  },
];
interface MyProps {
  dispatch: any,
  error: any,
  data: any,
  isLoading: any,
}

interface MyState {
  value: string
}
class Home extends React.Component<MyProps, MyState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataRequest(50));
  }

  componentDidUpdate(prevProps: any) {
    const { error } = this.props;
    if (error && prevProps.error !== error) {
      message.error(error.message);
    }
  }

  render() {
    const { data, isLoading, error } = this.props;

    if (isLoading) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
          <Spin size="large" />
        </div>
      );
    }

    if (!isLoading && error) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
          An error occurred: {error.message}
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
          <Empty description="No data available" />
        </div>
      );
    }

    return (
      <div style={{}}>
        <Table
          sortDirections={['ascend', 'descend', 'ascend']}
          showSorterTooltip={false}
          columns={columns}
          dataSource={data}
          rowKey="symbol"
          pagination={false}
          
        />
        <Button onClick={() => {
          const { dispatch } = this.props;
          dispatch(fetchDataRequest(50, 50));
        }} type="primary" shape="round" size='large' loading={isLoading}>
          load more
        </Button>
      </div>
    );
  }
}

const ImgIcon = ({ record }: { record: any }) => {
  const [imgSrc, setImgSrc] = React.useState(`https://assets.coincap.io/assets/icons/${record.symbol.toLowerCase()}@2x.png`);
  React.useEffect(() => {
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      setImgSrc(imgSrc);
    };
    image.onerror = () => {
      setImgSrc('https://coincap.io/static/logo_mark.png');
    };
  }, []);

  return (
    <img src={imgSrc} height={25} width={25} />
  );
};


const mapStateToProps = (state: any) => ({
  data: state.data.data,
  isLoading: state.isLoading,
  error: state.error,
});

export default connect(mapStateToProps)(Home);

