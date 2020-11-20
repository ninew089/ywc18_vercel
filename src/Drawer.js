import React, { useState } from 'react';
import { Drawer, Button, Row } from 'antd';
import Form from './Form'
import {
  FilterOutlined,
  LeftOutlined

} from '@ant-design/icons';

export default function Drawers({ value, setValue, price, setPrice, provice, setProvice, subCategory, setSubCategory }) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={showDrawer} size='large'>
        <FilterOutlined />
      </Button>
      <Drawer
        title={
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='start' align='middle'  >

            <Button type="text" onClick={onClose} size='large'>
              <LeftOutlined />

            </Button>
            <h2>กรอกผล</h2>
          </Row>

        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={'100%'}
      >
        <Form value={value} setValue={setValue} price={price} setPrice={setPrice} provice={provice} setProvice={setProvice} subCategory={subCategory} setSubCategory={setSubCategory} />
      </Drawer>
    </>
  );
}