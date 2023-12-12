/* eslint-disable */
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div className="App">
        Hello, React!!
      </div>
    );
  }
=======
import React, { useState } from 'react'



function App() {
  const [isFolderOpen, setFolderOpen] = useState(false);

  const toggleFolder = () => {
    setFolderOpen(!isFolderOpen);
  };


  return (
    <div className="App">
      <div className='black-nav'>
        <div>Auto Labeling</div>
      </div>
      <h3>Open Folder!</h3>
      {/* 폴더 열기 버튼 */}
      <button onClick={toggleFolder}>
        {isFolderOpen ? '폴더 닫기' : '폴더 열기'}
      </button>

      {/* 폴더 내용 */}
      {isFolderOpen && (
        <div>
          {/* 폴더 내용을 이곳에 추가하세요 */}
        </div>
      )}
    </div>
  );
>>>>>>> origin/HEAD
}

export default App;
