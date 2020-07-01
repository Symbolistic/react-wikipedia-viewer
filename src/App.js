import React, { useState } from 'react';
import './App.css';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    if (event.key === "Enter" || event.type === "click") {
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
      <div className={wikiData.length > 0 ? "search-boxTOP" : "search-box"}>

          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search..."
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyPress={search}
            />

            <button id="submit" className="search-btn" type="submit" onClick={search}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
          <div id="wiki-data">
            {(wikiData.length > 0) ? (
              wikiData.map((val) => {

                return (
                  <a key={val.pageid} className="results" href={`https://en.wikipedia.org/wiki/${val.title}`}><div>
                    <h2 className="result-title">{val.title}</h2>
                    <p className="result-info">{val.extract}</p>
                  </div></a>
                );
              })
            ) : ('')}
          </div>
    </div>
  );
}

export default App;
