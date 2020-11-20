import React, { useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { useHistory } from 'react-router-dom'


export default function Complete() {
  const history = useHistory()
  const [search, setSearch] = useState()
  const [options] = useState([
    { value: 'ร้านอาหารและ เครื่องดื่ม' },
    { value: 'ร้านค้า OTOP' },
    { value: 'สิ้นค้าทั่วไป' },
  ]);

  const handleSearch = (value) => {
    setSearch(value)

  };
  const onClickSearch = () => {
    history.push(`/ywc/?q=${search}&&category=&&priceLevel=&&provice=&&subCategory=`)
  }

  return (
    <AutoComplete

      dropdownMatchSelectWidth={252}
      style={{
        width: '60%',
      }}
      options={options}
      onClick={onClickSearch}
      onSearch={handleSearch}
    >
      <Input.Search size="large" placeholder="ค้นหาชื่อ ร้านอาหารและเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป" enterButton />
    </AutoComplete>
  );
};

