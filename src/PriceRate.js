import React, { useState } from 'react';
import { Select } from 'antd';
import './assets/custom-ant.css'
import axios from 'axios'

export default function SelectProvinces({ price, setPrice, index }) {
  const { Option } = Select;

  function handleChange(value) {
    setPrice(value)
  }
  const [data, setData] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://panjs.com/ywc18.json",
      );
      setData(result.data.priceRange);
    };

    fetchData();

  }, [index]);

  return (
    <>
      <Select defaultValue='ราคา' style={{ width: '100%' }} onChange={handleChange} size={'large'}>
        <Option value={'ทั้งหมด'}> ทั้งหมด</Option>
        {data.map((data, index) =>
          <Option value={index + 1}>{data}</Option>
        )}

      </Select>


    </>
  );
}

