import React from 'react';
import { Table, Spin, Empty, message, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import { fetchDataRequest } from '../../Services/action';
import Icon, { CaretUpOutlined, CaretDownOutlined,LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;
const LIMIT = 50;
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

const renderTitle = (title, key, sortColumns) => {
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
const columns = [
    {
        title: ({ sortColumns }) => renderTitle('Rank', 'rank', sortColumns),
        dataIndex: 'rank',
        key: 'rank',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.rank - b.rank,
    },
    {
        title: ({ sortColumns }) => renderTitle('Name', 'name', sortColumns),
        dataIndex: 'name',
        key: 'name',
        render: (value, record) => (
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
        render: (value) => (
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
        render: (value) => {
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
        render: (value) => (
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
        render: (value) => {
            value = numberFormatter.format(Number(value)).toLocaleLowerCase()
            return (
                <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <Text>{value}</Text>
                </div>);
        },
        sorter: (a, b) => a.supply - b.supply
    },
    {
        title: ({ sortColumns }) => renderTitle('Volume (24Hr)', 'volumeUsd24Hr', sortColumns),
        dataIndex: 'volumeUsd24Hr',
        key: 'volumeUsd24Hr',
        render: (value) => {
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
        render: (value) => {
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
const columnsMD = [
    {
        title: ({ sortColumns }) => renderTitle('Name', 'name', sortColumns),
        dataIndex: 'name',
        key: 'name',
        render: (value, record) => (
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
        render: (value) => (
            <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Text>{Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
            </div>
        ),
        sorter: (a, b) => a.priceUsd - b.priceUsd
    },
    {
        title: ({ sortColumns }) => renderTitle('VWAP (24Hr)', 'vwap24Hr', sortColumns),
        dataIndex: 'vwap24Hr',
        key: 'vwap24Hr',
        render: (value) => (
            <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Text>{Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
            </div>
        ),
        sorter: (a, b) => a.vwap24Hr - b.vwap24Hr,
    },
];
class AssestTable extends React.Component {
    constructor(MyProps) {
        super(MyProps);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.setState({ limit: LIMIT, offset: 0 })
        const { dispatch } = this.props;
        dispatch(fetchDataRequest(LIMIT));
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error && prevProps.error !== error) {
            message.error(error.message);
        }
    }

    render() {
        const { data, isLoading, error } = this.props;

        if (isLoading && this.state.offset === 0) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 24,color:"white" }} spin />}/>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Table
                    sortDirections={['ascend', 'descend', 'ascend']}
                    showSorterTooltip={false}
                    columns={window.innerWidth<=782 ? columnsMD : columns}
                    dataSource={data}
                    rowKey="symbol"
                    pagination={false}
                    tableLayout="fixed"
                />
                <Button
                    type="primary"
                    shape="round"
                    size='large'
                    onClick={() => {
                        const { dispatch } = this.props;
                        let newOffset = this.state.limit + this.state.offset
                        dispatch(fetchDataRequest(LIMIT, newOffset));
                        this.setState({
                            limit: LIMIT,
                            offset: newOffset
                        })
                    }}
                    style={{ backgroundColor: "rgb(24, 198, 131)", marginTop: 18 }}
                    loading={isLoading}
                >
                    Load More
                </Button>

            </div>

        );
    }
}

class ImgIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: `https://assets.coincap.io/assets/icons/${props.record.symbol.toLowerCase()}@2x.png`
        };
    }

    componentDidMount() {
        const image = new Image();
        image.src = this.state.imgSrc;
        image.onload = () => {
            this.setState({ imgSrc: this.state.imgSrc });
        };
        image.onerror = () => {
            this.setState({ imgSrc: 'https://coincap.io/static/logo_mark.png' });
        };
    }

    render() {
        return (
            <img src={this.state.imgSrc} height={25} width={25} />
        );
    }
}


const mapStateToProps = (state) => ({
    data: state.data.data,
    isLoading: state.isLoading,
    error: state.error,
});

export default connect(mapStateToProps)(AssestTable);

