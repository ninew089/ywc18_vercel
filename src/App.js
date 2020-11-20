import React, { useState } from 'react'
import 'antd/dist/antd.css'
import './assets/font.css'
import { Row, Col, Layout } from 'antd';
import AutoComplete from './AutoComplete'
import Select from './Select'
import halflogo from './assets/halfhalf-logo.png'
import halflogomini from './assets/halfhalf-logo-mini.png'
import Card from './Card'
import { useMediaQuery } from 'react-responsive'
import Drawer from './Drawer'

const { Content, Footer } = Layout;

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })
  const [price, setPrice] = useState('');
  const [provice, setProvice] = useState('ทั้งหมด');
  const [value, setValue] = useState(0)
  const [subCategory, setSubCategory] = useState('ทั้งหมด');


  return (
    <Layout>
      <div style={{ zIndex: 0, width: '100%', background: "white", alignItems: "center", paddingTop: 14, paddingBottom: 10 }}>
        <Row justify="center" align='middle'>
          <Col span={isMobile ? 2 : 3} push={1}  >
            <img src={isMobile ? halflogomini : halflogo} alt="logo" height="100%" width="100%" />
          </Col>

          <Col span={isMobile ? 21 : 20} pull={isMobile ? 0 : 1}>
            <Row justify="center" gutter={{ xs: 12, sm: 18, md: 24, lg: 2 }} >

              {isMobile ? <>
                <AutoComplete /><Drawer value={value} setValue={setValue} price={price} setPrice={setPrice} provice={provice} setProvice={setProvice} subCategory={subCategory} setSubCategory={setSubCategory} />
              </> :
                <>
                  <Select provice={provice} setProvice={setProvice} />
                  <AutoComplete />
                </>
              }
            </Row>
          </Col>
        </Row>
      </div>

      <Content className="site-layout" style={{ background: "#273a7c" }}>
        <div style={{ paddingLeft: '100px', margin: '0.5rem 0.8rem', color: "white", fontSize: 16 }}>
          <div style={{ textDecoration: "underline", display: 'inline', marginRight: '4px' }} >หน้าแรก</div>
           /
          <div style={{ color: "white", display: 'inline', marginLeft: '4px', fontWeight: 600 }}>ค้นหา</div>


        </div>
      </Content>
      <Content className="site-layout" style={{ padding: '0 10px', marginTop: 10 }}>
        <Card value={value} setValue={setValue} price={price} setPrice={setPrice} provice={provice} setProvice={setProvice} subCategory={subCategory} setSubCategory={setSubCategory} />
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
}

export default App;
