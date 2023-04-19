import React, { useEffect, useState } from 'react';
import { Card, Input, List, Typography, Image } from "antd"
import './App.css';

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


function App() {
  const [seachedText,setSeachedText] = useState("")
  const [dataSource,setDataSource] = useState<Product[]>([])
  const [previewImages,setPreviewImages] = useState<string[]>([])
  

  useEffect(()=>{
    // API
    fetch(`https://dummyjson.com/products/search?q=${seachedText}`)
    .then(res => res.json())
    .then(response => {
      console.log(response.poducts)
      setDataSource(response.poducts)
    })
    // .then(json => console.log(json))
  }, [seachedText])


// const renderCards: React.ReactNode | undefined = (item: never, index: number)=> 
// {


// }


  return (
    <>
      <Typography.Title
      style={{textAlign: "center",fontFamily:"monospace"}}
      > My Gallery
      </Typography.Title>
      <Input.Search
        style={{maxWidth: 500, display:'flex', margin:'auto'}}
        onSearch={(value)=>{ setSeachedText(value) }}

      > </Input.Search>
      <List
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
              style={{height:300, margin: 12, }}
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
          preview={{ visible: (previewImages.length?true:false) }}
          // onVisibleChange: (value)
           
          >
          {previewImages.map(
            (image)=>{
              return <Image src={image}></Image>
            })}
          </Image.PreviewGroup>
      : null
      }

    </>
  );
}

export default App;
