import React , {useState} from 'react';
import CreateCard from './Components/CreateCard';
import Card from './Components/Card';
import { useEffect } from 'react';
import axios from 'axios';
const App = () =>{
  
  const [data,setData] = useState([]);
 const handleNewCard = (newCard) => {
    setData((prevData) => [...prevData, newCard]);
  };
  useEffect(()=>{
      try{
        
        axios.get('http://localhost:3001/api/getAll').then((response)=>{
          setData(response.data);
        })
      }catch(err){
        console.log(err);
      }
  },[])
  return (
    <>
    <CreateCard cardData = {handleNewCard}/>
    <Card data = {data} onDelete={setData}/>
    </>
  )
}
export default App;