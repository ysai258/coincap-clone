import  { Component } from 'react';
import { Typography, Row, Col } from 'antd';
import { SearchOutlined, SettingOutlined } from '@ant-design/icons';
import "./home.css";

import AssestsTable from '../../Components/AssetsTable/assestsTable';

const { Text } = Typography;

const stats = [
  { id: 1, name: "MARKET CAP", value: "$1.21T" },
  { id: 2, name: "EXCHANGE VOL", value: "$26.26B" },
  { id: 3, name: "ASSETS", value: "2,295" },
  { id: 4, name: "EXCHANGES", value: "73" },
  { id: 5, name: "MARKETS", value: "12,563" },
  { id: 6, name: "BTC DOM INDEX", value: "35.1%" },
]

class Home extends Component {

  render() {
    return (
      <div style={{ backgroundImage: "linear-gradient(to right, #3F51B5 , #64B5F6)", width: "100%" }}>
        <div style={{ padding: "5px", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "linear-gradient(97.53deg, rgb(246, 135, 179) 5.6%, rgb(123, 97, 255) 59.16%, rgb(22, 209, 161) 119.34%)" }}>
          <img src={"https://coincap.io/static/logos/ss-mark-white.svg"} style={{ height: "25px", marginRight: "5px" }} />
          <Text style={{ color: "white", fontSize: 14, fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif" }}>Buy, sell, & swap your favorite assets. No KYC. No added fees. Decentralized.</Text>
          <img src={"https://coincap.io/static/icons/arrow-right.svg"} style={{ marginLeft: "5px", height: "16px" }} />
        </div>
        <Row justify="space-around" align="middle" style={{ backgroundColor: "white", position: "sticky", top: 0, zIndex: 9999 }}>
          <Col xs={6} sm={6} md={6} lg={6} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <div className='nav-item'>Coins</div>
            <div className='nav-item'>Exchanges</div>
            <div className='nav-item'>Swap</div>
          </Col>
          <Col lg={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className='nav-item nav-logo'><img src='https://coincap.io/static/logos/black.svg' width={"100%"} height={30} /></div>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <div className='nav-item'>USD</div>
            <div className='nav-item'>English</div>
            <div className='nav-item'><SearchOutlined /></div>
            <div className='nav-item'><SettingOutlined /></div>
          </Col>
        </Row>

        <Row style={{ backgroundImage: "linear-gradient(to right, #3F51B5 , #64B5F6)" }} justify="space-around" align="middle">
          <Col xs={0} sm={1} md={0} lg={2}></Col>
          {stats.map(stat => {
            return <Col style={{ marginTop: "10px", marginBottom: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} xs={22} sm={20} md={8} lg={3} key={stat.id}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 14, fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif" }}>{stat.name}</Text>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 21, fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif" }}>{stat.value}</Text>
            </Col>
          })}
          <Col xs={0} sm={1} md={0} lg={2}></Col>
        </Row>
        <div style={{ position: "relative" }}>
          <div style={{ height: "80px", backgroundImage: "linear-gradient(to right, #3F51B5 , #64B5F6)" }}></div>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
            <Row justify="space-around" align="middle">
              <Col xs={0} sm={1} md={0} lg={2}></Col>
              <Col lg={20} style={{ zIndex: 9998, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <AssestsTable />
              </Col>
              <Col xs={0} sm={1} md={0} lg={2}></Col>
            </Row>

          </div>
        </div>

      </div>
    );
  }
}

export default Home;

