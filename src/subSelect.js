import React, {useState}from 'react';
import { Select } from 'antd';
import './assets/custom-ant.css'
import axios from 'axios'
import { EnvironmentFilled } from '@ant-design/icons'

export default function SelectProvinces({provice, setProvice}) {
    const { Option } = Select;

function handleChange(value) {
 setProvice(value)
}
const [data, setData] = useState([]);
React.useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get(
      "https://panjs.com/ywc18.json",
    );
    setData(result.data.provinces);
  };

  fetchData();
}, []);
  return (
    <>
      <>จังหวัด/ใกล้ฉัน</>
      <Select defaultValue={<div><EnvironmentFilled/>พื้นที่ใกล้ฉัน</div>} style={{ width: '100%' }} onChange={handleChange} size={'large'}>
        {data.map((data, index) =>
        
          <Option value={data}>{ data}</Option>
        
        
        )}
   
    </Select>
 

    </>
  );
}