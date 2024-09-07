import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../css/card.css";
import axios from "axios";

const Card = ({ data, setData }) => {
  const handleDeleteCard = async (index) => {
    try {
      const id = data[index]._id;
      // console.log("Deleting task with ID:", id);
      const response = await axios.post("http://localhost:3001/api/delete", {
        id,
      });
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateCard = async (index) => {
    try {
        const id = data[index]._id; 
        const title = prompt("Enter new title:", data[index].title); 
        const description = prompt("Enter new description:", data[index].description);

        if (title && description) { 
            const response = await axios.patch('http://localhost:3001/api/update', { id, title, description });
            const updatedData = data.map((item, idx) => (idx === index ? response.data : item));
            setData(updatedData);
        }
    } catch (err) {
        console.log(err);
    }
}

  return (
    <div className="card-container">
      {data.map((item, index) => (
        <div key={index} className="card">
          <h3>Title: {item.title}</h3>
          <p>{item.description}</p>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon className="" />}
            onClick={() => {
              handleDeleteCard(index);
            }}
          >
            Delete
          </Button>
          <Button
    variant="outlined" className="btn"
    onClick={() => handleUpdateCard(index)} // Call update function on click
>
    Update
</Button>
        </div>
      ))}
    </div>
  );
};

export default Card;
