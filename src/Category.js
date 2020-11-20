import React, { useState } from 'react';
import { Radio } from 'antd';
import axios from 'axios'

export default function Category({ value, setValue }) {

  const onChange = e => {
    setValue(e.target.value)
  }
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  const [data, setData] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://panjs.com/ywc18.json",
      );
      setData(result.data.categories);
    };

    fetchData();
  }, []);


  return (
    <>

      <Radio.Group onChange={onChange} value={value}>

        <Radio style={radioStyle} value={0}>
          ทั้งหมด
        </Radio>
        {data.map((data, index) =>

          <Radio style={radioStyle} value={index + 1}>
            {data.name}
          </Radio>

        )}


      </Radio.Group>
    </>
  );
}
