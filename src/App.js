import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import api from './services/api';
import { GoMarkGithub,GoRepoForked,GoStar,GoRepo,GoOctoface } from "react-icons/go";

function App() {
  const [language, setLaguage] = useState('Java')
  const [arrayGet, setArrayGet] = useState([])

  function changeLanguage()
  {
    var select = document.getElementById('select')
    var value = select.options[select.selectedIndex].value

    setLaguage(value)
  }

  async function apiRequest()
  {
    
    const requestGet = await api.get(`/search/repositories?q=language:${language}&sort=stars&page=1`)
    setArrayGet(requestGet.data.items)
  }
  

  useEffect(() => {
    apiRequest()

  }, [language])
  

  return (
    <body>
       <header className="navbar" > 
          <GoMarkGithub size='50px' style={{margin: '10'}}/>
          <p className="text-navbar">Select your language:</p>
          <select className='styled-select' onChange={changeLanguage} id="select">
                <option>Java</option>
                <option>C#</option>
                <option>JavaScript</option>
                <option>Python</option>
          </select>
        </header>
      <div className="App">  
        <div className="git_card">
            {arrayGet.map(question => {
              return (
                  <li className="Gits">
                    <img className="git_image" src={question.owner.avatar_url}/>
                    <p><GoOctoface/><b>Name:</b> {question.name}</p>
                    <p><GoRepoForked/><b>Forks:</b> {question.forks_count}</p>
                    <p><GoStar/><b>Stars:</b> {question.stargazers_count}</p>
                    <GoRepo/><a href={question.stargazers_url}>Go to repositorie</a>
                  </li>
                  
              )
            })}
        </div>
      </div>
    </body>
  );
}

export default App;
