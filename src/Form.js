import React from 'react'
import { Form, Button } from 'antd';
import SubSelect from './subSelect'
import Category from './Category'
import SubCategory from './SubCategory'
import PriceRate from './PriceRate'
export default function NormalLoginForm({ value, setValue, price, setPrice, provice, setProvice, subCategory, setSubCategory }) {



  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}

      style={{ background: "white", padding: 14 ,overflow:'hidden', }}
    >
      <Form.Item style={{ fontSize: '1.06rem', fontWeight: 500 }}>
        ประเภทร้านค้า
             </Form.Item>
      <Form.Item >
        <Category value={value} setValue={setValue} />
      </Form.Item>
      <Form.Item>
        <SubSelect provice={provice} setProvice={setProvice} />
      </Form.Item>
      <Form.Item>
        <>ช่วงราคาสินค้า (บาท)</>
        <PriceRate price={price} setPrice={setPrice} index={value} />
      </Form.Item>
      {value !== 0 && value !== 3 &&

        <Form.Item  >
      
        <SubCategory index={value} subCategory={subCategory} setSubCategory={setSubCategory} />
      
         
        </Form.Item>
      }

      <Form.Item>
        <Button type="default" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
          ตกลง
          </Button>

      </Form.Item>
    </Form>
  );
};



