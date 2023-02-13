import { Component } from 'react';
import { Typography, Row, Col, Menu, Drawer, Button } from 'antd';
import { SearchOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import "./home.css";

import AssestsTable from '../../Components/AssetsTable/assestsTable';
import Selector from '../../Components/Selector/selector';
type MenuItem = Required<MenuProps>['items'][number];
const { Text } = Typography;

const stats = [
  { id: 1, name: "MARKET CAP", value: "$1.21T" },
  { id: 2, name: "EXCHANGE VOL", value: "$26.26B" },
  { id: 3, name: "ASSETS", value: "2,295" },
  { id: 4, name: "EXCHANGES", value: "73" },
  { id: 5, name: "MARKETS", value: "12,563" },
  { id: 6, name: "BTC DOM INDEX", value: "35.1%" },
]

const children = stats.map(stat => {
  return {
    key: stat.id,
    label: <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        {stat.name}
      </div>
      <div>
        {stat.value}
      </div>
    </div>
  }
});

interface MyProps {

}
interface MyState {
  open: boolean,
}
class Home extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      open: false
    };
  }
  componentDidMount(): void {
    this.setState({ open: false })
  }
  render() {
    return (
      <div style={{ backgroundImage: "linear-gradient(to right, #3F51B5 , #64B5F6)", width: "100%" }}>
        <div style={{ padding: "5px", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "linear-gradient(97.53deg, rgb(246, 135, 179) 5.6%, rgb(123, 97, 255) 59.16%, rgb(22, 209, 161) 119.34%)" }}>
          <img src={"https://coincap.io/static/logos/ss-mark-white.svg"} style={{ height: "25px", marginRight: "5px" }} />
          <Text style={{ color: "white", fontSize: 14, fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif" }}>Buy, sell, & swap your favorite assets. No KYC. No added fees. Decentralized.</Text>
          <img src={"https://coincap.io/static/icons/arrow-right.svg"} style={{ marginLeft: "5px", height: "16px" }} />
        </div>
        <Row className='navbar-lg' justify="space-around" align="middle" style={{ backgroundColor: "white", position: "sticky", top: 0, zIndex: 9999 }}>
          <Col xs={6} sm={6} md={6} lg={6} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <div className='nav-item'>Coins</div>
            <div className='nav-item'>Exchanges</div>
            <div className='nav-item'>Swap</div>
          </Col>
          <Col lg={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className='nav-item nav-logo'><img src='https://coincap.io/static/logos/black.svg' width={"100%"} height={30} /></div>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <Selector defaultValue='USD' options={[
              {
                value: 'USD',
                label: 'USD',
              },
              {
                value: 'INR',
                label: 'INR',
              },
              {
                value: 'AED',
                label: 'AED',
              },
              {
                value: 'AFN',
                label: 'AFN',
              },
              {
                value: 'DZD',
                label: 'DZD',
              },
              {
                value: 'AOA',
                label: 'AOA',
              },
              {
                value: 'AMD',
                label: 'AMD',
              },
            ]} />
            <Selector defaultValue='ENGLISH' options={[
              {
                value: 'ENGLISH',
                label: 'ENGLISH',
              },
              {
                value: 'HINDI',
                label: 'HINDI',
              },
              {
                value: 'TELUGU',
                label: 'TELUGU',
              },
              {
                value: 'TAMIL',
                label: 'TAMIL',
              },
              {
                value: 'KANNADA',
                label: 'KANNADA',
              },
              {
                value: 'URDU',
                label: 'URDU',
              },
            ]} />
            <div className='nav-item'><SearchOutlined /></div>
            <div className='nav-item'><SettingOutlined /></div>
          </Col>
        </Row>
        <div className='navbar-md' style={{ justifyContent: "space-between", alignItems: "center", backgroundColor: "white", position: "sticky", top: 0, zIndex: 9 }}>
          <div className='nav-item'><SearchOutlined /></div>
          <div className='nav-item nav-logo'><img src='https://coincap.io/static/logos/black.svg' width={"100%"} height={30} /></div>
          <div className='nav-item'><MenuOutlined onClick={() => {
            this.setState({ open: true })
          }
          } /></div>
        </div>

        <Row className='stats-lg' style={{ backgroundImage: "linear-gradient(to right, #3F51B5 , #64B5F6)" }} justify="space-around" align="middle">
          <Col xs={0} sm={0} md={0} lg={2}></Col>
          {stats.map(stat => {
            return <Col style={{ marginTop: "10px", marginBottom: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} sm={8} md={8} lg={3} key={stat.id}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 14, fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif" }}>{stat.name}</Text>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 21, fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif" }}>{stat.value}</Text>
            </Col>
          })}
          <Col xs={0} sm={0} md={0} lg={2}></Col>
        </Row>
        <div className='stats-md'>
          <Menu
            mode="inline"
            items={[{
              key: 1,
              children: children,
              label: "Market Snapshot",
            }]}
          />
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ height: "80px", backgroundImage: "linear-gradient(to right, #3F51B5 , #64B5F6)" }}></div>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
            <div className='table-container'>
              <AssestsTable />
            </div>
          </div>
        </div>
        <div>
          <Drawer
            title=""
            placement={"left"}
            closable={false}
            onClose={() => {
              this.setState({ open: false })
            }
            }
            width={200}
            open={this.state.open || false}
            key={"left"}
          >
            <div style={{ padding:10,display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>Coins</div>
            <div style={{ padding:10,display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >Exchanges</div>
            <div style={{ padding:10,display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>Swap</div>
            <div style={{ padding:10,display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>API</div>
            <div style={{ padding:10,display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>Settings</div>
            <div style={{ padding:10,display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Button
              type="primary"
              shape="round"
              size="small"

              style={{ backgroundColor: "rgb(24, 198, 131)" }}>Connect Wallet</Button>
              </div>
            <div style={{ padding:10,display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Selector
                defaultValue='USD' options={[
                  {
                    value: 'USD',
                    label: 'USD',
                  },
                  {
                    value: 'INR',
                    label: 'INR',
                  },
                  {
                    value: 'AED',
                    label: 'AED',
                  },
                  {
                    value: 'AFN',
                    label: 'AFN',
                  },
                  {
                    value: 'DZD',
                    label: 'DZD',
                  },
                  {
                    value: 'AOA',
                    label: 'AOA',
                  },
                  {
                    value: 'AMD',
                    label: 'AMD',
                  },
                ]} />
            </div>
            <div style={{padding:10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

              <Selector defaultValue='ENGLISH' options={[
                {
                  value: 'ENGLISH',
                  label: 'ENGLISH',
                },
                {
                  value: 'HINDI',
                  label: 'HINDI',
                },
                {
                  value: 'TELUGU',
                  label: 'TELUGU',
                },
                {
                  value: 'TAMIL',
                  label: 'TAMIL',
                },
                {
                  value: 'KANNADA',
                  label: 'KANNADA',
                },
                {
                  value: 'URDU',
                  label: 'URDU',
                },
              ]} />
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default Home;

