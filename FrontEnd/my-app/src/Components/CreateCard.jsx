import React, { useState } from "react";
import "../css/createCard.css";
import axios from "axios";
import Search from "./Search";

const CreateCard = ({ cardData }) => {
  const [searchTerm, setSearchTerm] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    cardData(data);

    setData({
      title: "",
      description: "",
    });
  };

  const showData = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addTask = () => {
    if (data.title) {
      try {
        axios
          .post("http://localhost:3001/api/addNew", data)
          .then((response) => {
            console.log(response);
          });
      } catch (e) {
        console.log("Error:", e);
      }
    }
  };

  // Function to set searchTerm to true
  const handleSearchComplete = () => {
    setSearchTerm(true);
  };

  return (
    <>
      <Search check={handleSearchComplete} /> 
      {!searchTerm && ( 
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Card Name"
              value={data.title}
              onChange={showData}
              className="input-field"
            />
            <textarea
              name="description"
              placeholder="Enter Description"
              value={data.description}
              onChange={showData}
              className="textarea-field"
            />
            <button type="submit" className="submit-button" onClick={addTask}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateCard;
