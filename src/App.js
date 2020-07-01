import React, { useState } from 'react';
import './App.css';



function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [wikiData, setWikiData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  const search = event => {
    let url = "https://en.wikipedia.org/w/api.php";

    let params = {
      action: "query",
      list: "search",
      srsearch: searchQuery,
      format: "json"
    }

    if (event.key === "Enter") {
      url = url + "?origin=*";

      Object.keys(params).forEach((key) => url += '&' + key + '=' + params[key]);

      fetch(url)
        .then(res => res.json())
        .then(response => {
          console.log("Exists! Success!");
          console.log(typeof response)
          setWikiData(response.query.search);
          setSearchQuery('')
          console.log(wikiData.length)
          setIsLoaded(false);
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div className="App">
      <div className="search-box">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search..."
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyPress={search}
            />
        </div>
          <div>
            {(wikiData.length > 0 && isLoaded === false) ? (
              wikiData.map((val) => {
                console.log(val)
                return (
                  <div>
                    <h2>{val.title}</h2>
                    <p>{val.snippet}</p>
                  </div>
                )       
              })
            ) : ('')}
          </div>
    </div>
  );
}

export default App;
