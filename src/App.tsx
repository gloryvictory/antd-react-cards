import React, { useEffect, useState } from 'react';
import {Space, Card, Input, List, Typography, Image } from "antd"
import './App.css';
const { Search } = Input;

export interface Pokedex {
  products: Product[];
  total:    number;
  skip:     number;
  limit:    number;
}

export interface Product {
  id:                 number;
  title:              string;
  description:        string;
  price:              number;
  discountPercentage: number;
  rating:             number;
  stock:              number;
  brand:              string;
  category:           string;
  thumbnail:          string;
  images:             string[];
}



const App: React.FC = () => {
  const [seachedText,setSeachedText] = useState("")
  const [loading,setLoading] = useState(false)
  const [dataSource,setDataSource] = useState<Product[]>([])
  const [previewImages,setPreviewImages] = useState<string[]>([])

  useEffect(()=>{
    // API
    asyncGetCall()
  }, [seachedText])

  const asyncGetCall = async () => {
    try {
      setLoading(true)
         const response = await fetch(`https://dummyjson.com/products/search?q=${seachedText}`) ;
         const data = await response.json();
        // enter you logic when the fetch is successful
         const { products } = data
         setDataSource(products)
         setLoading(false)
       } catch(error) {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error)
         }
  }

  const onSearch = (value: string)=>{ setSeachedText(value) }


  return (
    <>
     <Space
        style={{padding: "0px 16px"}}
        direction="vertical"
     >
      <Typography.Title
      style={{textAlign: "center",fontFamily:"monospace"}}
      > My Gallery
      </Typography.Title>
      <Space
        style={{maxWidth: 500, display:'flex', margin:'auto'}}
        direction="vertical">
        <Search
          style={{maxWidth: 500, display:'flex', margin:'auto'}}
          onSearch={onSearch}
          placeholder="введите поисковой запрос"
          allowClear
          // onSearch={(value)=>{ setSeachedText(value) }}
        />
        <Typography.Text >Поиск для: <Typography.Text strong>{seachedText||"Все"}</Typography.Text> </Typography.Text>
      </Space>

      <List
      loading={loading}
        dataSource={dataSource}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{height:300, margin: 12, overflow:"hidden"}}
              key={item?.id}
              title={item?.title}
            >
              <Image
                src={item?.thumbnail}
                preview={{visible:false}}
                onClick={()=>{
                setPreviewImages(item.images)
                }}
              ></Image>
            </Card>
          </List.Item>
        )}
      ></List>
      {
        previewImages.length > 0
        ?<Image.PreviewGroup
          preview={{
            visible: (previewImages.length?true:false),
            onVisibleChange:(value)=>{
            if(!value){
              setPreviewImages([])
            }
          }}}
          // onVisibleChange: (value)
          >
          {previewImages.map(
            (image)=>{
              return <Image src={image}></Image>
            })}
          </Image.PreviewGroup>
      : null
      }
      </Space>
    </>
  );
}

export default App;
