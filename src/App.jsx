import { useState, useEffect } from 'react';
import './index.css';


function App () {

  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [backgroundColour, setBackgroundColour] = useState("#fff");
  const [colour, setColour] = useState("#000");

  const colours = [
  '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6' ,
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

  //Fetch quoutes on component mount
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
    .then((response) => {
      if(!response.ok){
        throw new Error("Network response was not okay");
      }
      return response.json()
    })  
    .then((data) => {
      setQuotes(data.quotes);
      getRandomQuote(data.quotes) //Display a quote initially
    })
    .catch((error) => {
      console.error("Error fetching quotes: ", error);
    });
  }, []); 

  //Generate a random quote
  const getRandomQuote = (quoteArr = quotes) => {
    if (quoteArr.length == 0) return;

    const randomIndex = Math.floor(Math.random() * quoteArr.length);
    const randomQuote = quoteArr[randomIndex];
    setCurrentQuote(randomQuote.quote);
    setCurrentAuthor(randomQuote.author);

    //Apply random colours to body and buttons
    const randomColor = colours[Math.floor(Math.random() * colours.length)];
    setBackgroundColour(randomColor);
    setColour(randomColor);
  }

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColour;
  }, [backgroundColour])
  return (

    <div id="wrapper">
    <div id="quote-box">
      <div id="quotes">
        <i id="sign"
            style={{ color: colour}}
           className="fa fa-quote-left"></i>
        <span id="text"
              style={{ color: colour}}
        >{currentQuote}</span>
        <i  id="sign"
            style={{ color: colour}}
            className="fa fa-quote-right"></i>
      </div>

      <div id="info">- <span id="author"
                              style={{ color: colour}}
                        >{currentAuthor}</span></div>

      <div id="buttons">
        <a target="_blank" 
           id="tweet-quote"
           style={{ backgroundColor: backgroundColour}} 
           href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
                  `"${currentQuote}" - ${currentAuthor}`
                  )}`} 
           title="Tweet this quote"
           rel="noopener noreferrer">
            <i className="fa fa-twitter"></i>   
        </a>

        <a target="_blank" 
           id="tumblr"
           style={{ backgroundColor: backgroundColour}} 
           href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(
              currentAuthor
            )}&contenst=${encodeURIComponent(
              currentQuote
            )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
           title="Post this quote on tumblr"
           rel="noopener noreferrer">
            <i className="fa fa-tumblr"></i>  
        </a>

        <button type="submit" 
            id="new-quote"
            style={{ backgroundColor: backgroundColour}} 
            onClick={() => getRandomQuote()}>New quote</button>
      </div>

    </div>

    <footer id="reference">
        By <a href="https://codepen.io/Incredible-Stand" target="_blank" rel="noopener noreferrer">Incredible Stand</a>
      </footer>

  </div>
  );
} 

export default App
