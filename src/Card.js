import React, { useState } from 'react'
import './assets/font.css'
import { Row, Col, Divider, Tooltip } from 'antd';
import Form from './Form'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { Avatar } from 'antd';
import { CarOutlined, BookOutlined, GitlabOutlined } from '@ant-design/icons';
import queryString from 'querystring'
export default function Content({ value, setValue, price, setPrice, provice, setProvice, subCategory, setSubCategory }) {
  const { search } = useLocation()
  const query = search.substring(1, search.length);
  const parsed = queryString.parse(query);
  const isLaptop = useMediaQuery({ query: '(min-width: 1360px)' })
  const isPad = useMediaQuery({ query: '(max-width: 1359px)' })
  const isPadMin = useMediaQuery({ query: '(min-width: 900px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 899px)' })
  const name = ['ทั้งหมด', 'ร้านอาหาร และเครื่องดื่ม', 'ร้านค้า OTOP', 'ร้านค้าธงฟ้า', 'สินค้าทั่วไป']
  const [data, setData] = useState([]);
  const history = useHistory()
  // eslint-disable-next-line
  const [sub, setSub] = useState([]);
  // eslint-disable-next-line
  const [provice1, setProvice1] = useState()
  const [seacrhQuery, setseacrhQuery] = useState('')
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://panjs.com/ywc18.json",
      );
      setData(result.data.merchants);

      setSub(result.data.subcategoryName)
    };
    history.push(`/ywc18/seacrh?q=&&category=${value}&&priceLevel=${price}&&provice=${provice}&&subCategory=${subCategory}`)
    // eslint-disable-next-line

    setProvice1(provice)

    fetchData();
    // eslint-disable-next-line
  }, [value, provice, price, subCategory]);
  React.useEffect(() => {
    if (parsed.q !== "undefined") {
      setseacrhQuery(parsed.q)
    }

  }, [parsed]);

  const renderIcons = (text) => {
    if (text === 'ที่จอดรถ') {
      return (<Tooltip placement="top" title={text}>
        <Avatar size={28} icon={<CarOutlined />} style={{ background: 'white', color: 'green', border: '1px solid green' }} />
      </Tooltip>)
    }
    if (text === 'รับจองล่วงหน้า') {
      return (<Tooltip placement="top" title={text}>
        <Avatar size={28} icon={<BookOutlined />} style={{ background: 'white', color: 'green', border: '1px solid green' }} />
      </Tooltip>)
    }
    if (text === 'สามารถนำสัตว์เลี้ยงเข้าได้') {
      return (<Tooltip placement="top" title={text}>
        <Avatar size={28} icon={<GitlabOutlined />} style={{ background: 'white', color: 'green', border: '1px solid green' }} />
      </Tooltip>)
    }

  }
  const getnName = () => {
    return name[value]
  }
  const priceLevelRender = (text) => {
    if (text === 1) {
      return <div style={{ display: 'inline-flex', alignItems: 'center' }}><span style={{ color: 'black' }}>฿</span>฿฿฿</div>
    }
    if (text === 2) {
      return <div style={{ display: 'inline-flex', alignItems: 'center' }}><span style={{ color: 'black' }}>฿฿</span>฿฿</div>
    }
    if (text === 3) {
      return <div style={{ display: 'inline-flex', alignItems: 'center' }}><span style={{ color: 'black' }}>฿฿฿</span>฿</div>
    }
    if (text === 4) {
      return <span style={{ color: 'black' }}>฿฿฿฿</span>
    }

  }

  const detailMobile = (data) => {
    return (
      <div style={{ background: "white", width: "100%", display: "block", marginBottom: 20, alignItems: 'center' }}>
        <img src={data.coverImageId} alt="img" width="100%" height="100%" style={{ height: '240px', objectFit: 'cover' }} />
        <div style={{ padding: 8 }}>
          <div style={{ display: 'inline-flex' }}>
            <div style={{ fontSize: '1.06rem', fontWeight: 500 }}>
              {data.shopNameTH}
            </div>
            {data.isOpen === "Y" ?
              <div style={{ fontSize: '0.8rem', fontWeight: 300, background: 'green', color: 'white', marginLeft: 8, padding: '4px 10px 4px 10px', borderRadius: 10 }}>
                เปิดอยู่
                 </div>
              :
              <div >

                {data.isOpen === "N" ?
                  <div style={{ fontSize: '0.8rem', fontWeight: 300, background: 'grey', color: 'white', marginLeft: 8, padding: '4px 10px 4px 10px', borderRadius: 10 }}>
                    ปิดแล้ว </div> : ""}
              </div>
            }

          </div>
          <div style={{ fontSize: '1rem', fontWeight: 300, color: 'grey' }}>
            {data.subcategoryName} | {priceLevelRender(data.priceLevel)} |  {data.addressDistrictName}  {data.addressProvinceName}
          </div>
          <Divider />
          <div style={{ fontSize: '1rem', fontWeight: 300, display: 'inline-flex' }}>

            {data.facilities.map((items, index) => (

              <div>
                {renderIcons(items)}&nbsp;
              </div>
            )
            )}
          </div>



          <div style={{ fontSize: '1rem', fontWeight: 300 }}>
            <div dangerouslySetInnerHTML={{ __html: data.highlightText }}></div>

          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div style={{ fontSize: '1rem', fontWeight: 500 }}>
              เมนูแนะนำ:
    </div>
            <div style={{ fontSize: '1rem', fontWeight: 300, color: 'gray', display: 'inline-flex' }}>
              {data.recommendedItems.map((items, index) => (

                <div>
                  {items}{index + 1 === data.recommendedItems.length ? "" : ","}&nbsp;
                </div>
              )
              )}
            </div>

          </div>
        </div>

      </div>


    )
  }
  const detail = (data) => {
    return (

      <div style={{ background: "white", padding: 10, width: "100%", marginBottom: 10 }}>
        <Row gutter={{ xs: 12, sm: 8, md: 24, lg: 2 }}>
          <img src={data.coverImageId} alt="img" width={isPad ? '100%' : 240} height="240px" style={{ objectFit: 'cover' }} />
          <Col offset={1}>
            <div style={{ display: 'inline-flex' }}>
              <div style={{ fontSize: '1.06rem', fontWeight: 500 }}>
                {data.shopNameTH}
              </div>
              {data.isOpen === "Y" ?
                <div style={{ fontSize: '0.8rem', fontWeight: 300, background: 'green', color: 'white', marginLeft: 8, padding: '4px 10px 4px 10px', borderRadius: 10 }}>

                  เปิดอยู่
                 </div>

                :
                <div >

                  {data.isOpen === "N" ?
                    <div style={{ fontSize: '0.8rem', fontWeight: 300, background: 'grey', color: 'white', marginLeft: 8, padding: '4px 10px 4px 10px', borderRadius: 10 }}>
                      ปิดแล้ว </div> : ""}
                </div>
              }

            </div>
            <div style={{ fontSize: '1rem', fontWeight: 300, color: 'grey' }}>
              {data.subcategoryName} | {priceLevelRender(data.priceLevel)} |  {data.addressDistrictName}  {data.addressProvinceName}
            </div>
            <Divider />

            <div style={{ fontSize: '1rem', fontWeight: 300, display: 'inline-flex' }}>

              {data.facilities.map((items, index) => (

                <div>
                  {renderIcons(items)}&nbsp;
                </div>
              )
              )}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 300 }}>
              <div dangerouslySetInnerHTML={{ __html: data.highlightText }}></div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
              <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                แนะนำ:&nbsp;
      </div>
              <div style={{ fontSize: '1rem', fontWeight: 300, color: 'gray', display: 'inline-flex' }}>

                {data.recommendedItems.map((items, index) => (

                  <div>
                    {items}{index + 1 === data.recommendedItems.length ? "" : ","}&nbsp;
                  </div>
                )
                )}
              </div>
            </div>


          </Col>

        </Row>

      </div>

    )
  }

  const type = (data, value, price, provice, subCategory) => {

    if (data.subcategoryName === subCategory || subCategory === 'ทั้งหมด') {
      if (provice === "ทั้งหมด" || provice === "กรุงเทพมหานคร") {
        if ((value === 4 && data.categoryName === 'งานบริการอื่นๆ / เบ็ดเตล็ด') || (value === 4 && data.categoryName === 'แฟชั่น')) {
          if (price === '' || price === 'ทั้งหมด') {
            return detail(data)
          } if (price === data.priceLevel) {
            return detail(data)
          }
        }
        if (value === 3 && data.categoryName === 'ร้านธงฟ้า') {
          if (price === '' || price === 'ทั้งหมด') {
            return (detailMobile(data))
          } if (price === data.priceLevel) {
            return (detailMobile(data))
          }
        }
        if (value === 2 && data.categoryName === 'ร้านOTOP') {
          if (price === '' || price === 'ทั้งหมด') {
            return (detailMobile(data))
          } if (price === data.priceLevel) {
            return (detailMobile(data))
          }
        }
        if (value === 1 && data.categoryName === 'ร้านอาหาร') {
          if (price === '' || price === 'ทั้งหมด') {
            return detail(data)
          } if (price === data.priceLevel) {
            return (
              detail(data)
            )
          }
        }
        if (value === 0) {
          if (price === '' || price === 'ทั้งหมด') {
            //tempalte
            return detail(data)

          } if (price === data.priceLevel) {
            return detail(data)
          }
        }
      }
    }
  }

  const typeMoBile = (data, value, price, provice) => {
    if (provice === "ทั้งหมด" || provice === "กรุงเทพมหานคร") {
      if ((value === 4 && data.categoryName === 'งานบริการอื่นๆ / เบ็ดเตล็ด') || (value === 4 && data.categoryName === 'แฟชั่น')) {
        if (price === '' || price === 'ทั้งหมด') {
          return (detailMobile(data))

        } if (price === data.priceLevel) {
          return (detailMobile(data))
        }
      }
      if (value === 3 && data.categoryName === 'ร้านธงฟ้า') {
        if (price === '' || price === 'ทั้งหมด') {
          return (detailMobile(data))
        } if (price === data.priceLevel) {
          return (detailMobile(data))
        }
      }
      if (value === 2 && data.categoryName === 'ร้านOTOP') {
        if (price === '' || price === 'ทั้งหมด') {
          return (detailMobile(data))
        } if (price === data.priceLevel) {
          return (detailMobile(data))
        }
      }
      if (value === 1 && data.categoryName === 'ร้านอาหาร') {
        if (price === '' || price === 'ทั้งหมด') {
          return (detailMobile(data))
        } if (price === data.priceLevel) {
          return (detailMobile(data))
        }
      }
      if (value === 0) {
        if (price === '' || price === 'ทั้งหมด') {
          return (detailMobile(data))


        } if (price === data.priceLevel) {
          return (detailMobile(data))
        }

      }
    }
  }
  const checkName = (name) => {

    for (let i = 0; i < data.length; i++) {

      if (name === data[i].shopNameTH) { return true }

    }

    return false

  }

  return (

    <div className="site-layout-background" style={{ padding: 8, minHeight: '600px' }}>
      <div style={{ color: "black", fontWeight: 600, fontSize: '24px' }}>ผลการค้นหา {getnName()}</div>
      <>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {/* คอม and ipad  */}
          {isPadMin &&
            <Col span={6} >
              <Form value={value} setValue={setValue} price={price} setPrice={setPrice} provice={provice} setProvice={setProvice} subCategory={subCategory} setSubCategory={setSubCategory} />
            </Col>
          }

          {/* คอม */}
          {isLaptop &&

            <Col span={18} offset={0} >

              {provice !== "ทั้งหมด" ? <div>{provice !== "กรุงเทพมหานคร" ? <div style={{ textAlign: 'center', fontSize: 32 }}>ไม่พบร้านอาหารในสถานที่คุณกำลังค้นหา</div> : <div>
                {(value === 2 || value === 3) && <div><div style={{ textAlign: 'center', fontSize: 32 }}>ไม่พบสถานที่ที่คุณกำลังหา
</div><div style={{ textAlign: 'center' }}>ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง</div></div>}
              </div>}</div> :
                <div>
                  {(value === 2 || value === 3) && <div><div style={{ textAlign: 'center', fontSize: 32 }}>ไม่พบสถานที่ที่คุณกำลังหา
</div><div style={{ textAlign: 'center' }}>ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง</div></div>}
                </div>
              }
              {/* ค้นหาตามชื่อ */}
              {seacrhQuery !== "" ?

                <div>
                  {data.map((data, index) =>

                    <div> {data.shopNameTH === seacrhQuery && type(data, value, price, provice, subCategory)}</div>
                  )}

                  <div> {!checkName(seacrhQuery) && <div><div style={{ textAlign: 'center', fontSize: 32 }}>ไม่พบสถานที่ที่คุณกำลังหา
                </div>
                    <div style={{ textAlign: 'center' }}>ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง</div>
                  </div>
                  }
                  </div>
                </div>
                :
                <div>
                  {data.map((data, index) =>
                    type(data, value, price, provice, subCategory)
                  )}
                </div>
              }
            </Col>
          }
          {isPadMin && !isLaptop &&
            <Col span={16} offset={0} >

              {provice !== "ทั้งหมด" ? <div>{provice !== "กรุงเทพมหานคร" ? <div style={{ textAlign: 'center', fontSize: 26 }}>ไม่พบร้านอาหารในสถานที่คุณกำลังค้นหา</div> : <div>
                {(value === 2 || value === 3) && <div><div style={{ textAlign: 'center', fontSize: 26 }}>ไม่พบสถานที่ที่คุณกำลังหา
              </div>
                  <div style={{ textAlign: 'center' }}>ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง</div></div>}
              </div>}</div> :
                <div>
                  {(value === 2 || value === 3) && <div><div style={{ textAlign: 'center', fontSize: 26 }}>ไม่พบสถานที่ที่คุณกำลังหา
                </div>
                    <div style={{ textAlign: 'center' }}>ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง</div></div>}
                </div>
              }
              {/* ค้นหาตามชื่อ */}
              {seacrhQuery !== "" ?
                <div>
                  {data.map((data, index) =>
                    <div> {data.shopNameTH === seacrhQuery && typeMoBile(data, value, price, provice, subCategory)}</div>
                  )}
                  <div> {!checkName(seacrhQuery) && <div><div style={{ textAlign: 'center', fontSize: 26 }}>ไม่พบสถานที่ที่คุณกำลังหา
                </div>
                    <div style={{ textAlign: 'center' }}>ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง</div>
                  </div>
                  }
                  </div>
                </div>
                :
                <div>
                  {data.map((data, index) =>

                    typeMoBile(data, value, price, provice, subCategory)




                  )}
                </div>
              }
            </Col>
          }
        </Row>
        {/* มือถือ */}
        {isMobile &&
          <div>

            {provice !== "ทั้งหมด" ? <div>{provice !== "กรุงเทพมหานคร" ?
              <div style={{ textAlign: 'center', fontSize: 20 }}>ไม่พบร้านอาหารในสถานที่คุณกำลังค้นหา</div> : <div>
                {(value === 2 || value === 3) && <div><div style={{ textAlign: 'center', fontSize: 20 }}>ไม่พบสถานที่ที่คุณกำลังหา</div>
                  <div style={{ textAlign: 'center' }}>ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง</div>
                </div>}
              </div>}
            </div> :
              <div>
                {(value === 2 || value === 3) && <div><div style={{ textAlign: 'center', fontSize: 20 }}>ไม่พบสถานที่ที่คุณกำลังหา
              </div>
                  <div style={{ textAlign: 'center' }}>ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง</div>
                </div>}
              </div>
            }
            {/* ค้นหาตามชื่อ */}
            {seacrhQuery !== "" ?
              <div>
                {data.map((data, index) =>
                  <div> {data.shopNameTH === seacrhQuery && typeMoBile(data, value, price, provice, subCategory)}</div>
                )}
                <div> {!checkName(seacrhQuery) && <div><div style={{ textAlign: 'center', fontSize: 20 }}>
                  ไม่พบสถานที่ที่คุณกำลังหา
              </div>
                  <div style={{ textAlign: 'center' }}>
                    ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง
                  </div>
                </div>
                }
                </div>
              </div>
              :
              <div>
                {data.map((data, index) =>
                  typeMoBile(data, value, price, provice, subCategory)
                )}
              </div>
            }
          </div>
        }
      </>
    </div>

  );
}


