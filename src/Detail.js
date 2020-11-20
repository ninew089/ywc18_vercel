import React from 'react'
import './assets/font.css'
import { Row, Col, Divider } from 'antd';


export default function Details(data) {

  return (

    <div style={{ background: "white", padding: 10, width: "100%", marginBottom: 10 }}>
      <Row gutter={{ xs: 12, sm: 8, md: 24, lg: 2 }}>

        <img src={data.coverImageId} alt="img" width="240px" height="240" />


        <Col offset={1}>

          <div style={{ display: 'inline-flex' }}>
            <div style={{ fontSize: '1.06rem', fontWeight: 500 }}>
              {data.shopNameTH}

            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 300, background: 'green', color: 'white', marginLeft: 8, padding: '4px 10px 4px 10px', borderRadius: 10 }}>
              {data.isOpen === "Y" ? "เปิด" : data.isOpen}
            </div>
          </div>
          <div style={{ fontSize: '1.06rem', fontWeight: 300, color: 'grey' }}>
            {data.categoryName}
          </div>


          <div style={{ fontSize: '1rem', fontWeight: 300 }}>
            {data.subcategoryName} | ช่วงราคา    {data.priceLevel} |      {data.addressProvinceName} | {data.addressDistrictName}
          </div>
          <Divider />
          <div style={{ fontSize: '1rem', fontWeight: 300 }}>
            {data.facilities}
          </div>




          <div style={{ fontSize: '1rem', fontWeight: 300 }}>
            <div dangerouslySetInnerHTML={{ __html: data.highlightText }}></div>

          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div style={{ fontSize: '1rem', fontWeight: 500 }}>
              เมนูแนะนำ:
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 300, color: 'gray' }}>
              {data.recommendedItems}
            </div>

          </div>


        </Col>

      </Row>

    </div>

  );
}


