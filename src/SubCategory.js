import React, { useState } from 'react';
import { Radio } from 'antd';
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'

export default function Category({ index, subCategory, setSubCategory }) {
  const onChange = e => {
    setSubCategory(e.target.value)
  }
  const isMax = useMediaQuery({ query: '(max-width: 1326px)' })
  const isMin = useMediaQuery({ query: '(min-width: 900px)' })
  const renderWidth = () => {
    if (isMax&&isMin) { 
      return (window.screen.width/6)
    }
    else {
      
      return (300)
    }
  }
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
width:renderWidth(),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const [data, setData] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://panjs.com/ywc18.json",
      );

      setData(result.data.categories[index - 1].subcategories);


    };

    fetchData();
  }, [index]);


  return (
    <>

      <Radio.Group onChange={onChange} value={subCategory}    >
        <Radio style={radioStyle} value={'ทั้งหมด'}>
          ทั้งหมด
           </Radio>

        {data.map((data, index) =>

<Radio style={{    display: 'block',
    height: '30px',
    lineHeight: '30px',
width:renderWidth(),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'}} value={data==='สินค้าเกี่ยวกับการตกแต่งบ้าน'?'สินค้า และ บริการ เกี่ยวกับการตกแต่งบ้าน':data }>
  {data}
</Radio>

)}
 
      
      </Radio.Group>


    </>
  );
}
