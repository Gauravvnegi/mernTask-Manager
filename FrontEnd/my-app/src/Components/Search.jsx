import React, { useState } from "react";
import "../css/Search.css";

const Search = ({ check }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // New state to track if a search has been performed

  const handleSearch = async (term) => {
    if (!term) {
      setSearchResults([]); // Clear results if the search term is empty
      setHasSearched(false); // Reset search status
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/searchTask?title=${encodeURIComponent(term)}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data); // Set the search results from the response
      setHasSearched(true); // Update search status to true
      check(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Update the search term as the user types
    handleSearch(value); // Trigger search with the updated term
  };

  return (
    <>
      <div className="topnav">
        <h1 className="active">Welcome</h1>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange} 
        />
      </div>

     
      <div className="search-results">
        {hasSearched && searchResults.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          searchResults.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Search;
