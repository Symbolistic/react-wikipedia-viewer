import React, { useState } from 'react';
import './App.css';



function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [wikiData, setWikiData] = useState([]);

  const search = event => {
    let url = "https://en.wikipedia.org/w/api.php";

    let params = {
      action: "query",
      prop: "extracts",
      generator: "search",
      exintro: '1',
      explaintext: '1',
      exsentences: '1',
      gsrsearch: searchQuery,
      format: "json"
    }

    if (event.key === "Enter") {
      url = url + "?origin=*";

      Object.keys(params).forEach((key) => url += '&' + key + '=' + params[key]);

      fetch(url)
        .then(res => res.json())
        .then(response => {
          console.log("Exists! Success!");
          //console.log(response.query.pages)
          setSearchQuery('');
          setWikiData(Object.entries(response.query.pages).map(val => val[1]));
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div className="App">
      <h1 id="title">Wikipedia Viewer</h1>
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
            {(wikiData.length > 0) ? (
              wikiData.map((val) => {

                return (
                  <div key={val.pageid}>
                    <h2>{val.title}</h2>
                    <p>{val.extract}</p>
                  </div>
                );
              })
            ) : ('')}
          </div>
    </div>
  );
}

export default App;
