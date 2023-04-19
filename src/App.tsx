import React, { useEffect, useState } from 'react';
import { Card, Input, List, Typography, Image } from "antd"
import './App.css';

function App() {
  const [seachedText,setSeachedText] = useState("")
  const [dataSource,setDataSource] = useState([])


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
        renderItem={(item) => (
          <List.Item>
            <Card key={item?.id!} title={item?.title!}>
              <Image src={item?.thumbnail!}></Image>
            </Card>
          </List.Item>
        )}
      ></List>


    </>
  );
}

export default App;
