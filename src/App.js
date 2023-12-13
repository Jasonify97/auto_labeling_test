// eslint-disable
import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Replicate from "replicate";

const FolderSelector = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFolderSelect = () => {
    fileInputRef.current.click();
  };
  //handleSelectedFolder : img filter기능
  const handleSelectedFolder = (event) => {
    const fileList = Array.from(event.target.files);
    const allowedExtensions = ["jpeg", "png", "jpg"];

    const sortedFiles = fileList
      .filter(file => allowedExtensions.some(ext => file.type.endsWith(ext)))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    setSelectedFiles(sortedFiles);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedFiles.length);
    } else if (event.key === 'ArrowLeft') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedFiles.length) % selectedFiles.length);
    }
  };
  useEffect(() => {
    // Add event listener for the right arrow key
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, selectedFiles]);

  return (

    <div className='App'>
      {/* header */}
      <header className="black-nav">
        <h3>Auto Labeling</h3>
      </header>

      <div className='body'>
        {/* leftbar */}
        <div className='left_bar'>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            directory=""
            webkitdirectory=""
            onChange={handleSelectedFolder}
          />
          <button onClick={handleFolderSelect}>Select Folder</button>
        </div>

        {/* main */}
        <div className='main'>
          {/* <h2>{ currentIndex }Select a Folder</h2> */}
          <div className='image'>
            {selectedFiles.length > 1 && (
              <img
                src={URL.createObjectURL(selectedFiles[currentIndex])}
                alt="폴더에 이미지가 없습니다!"
                style={{ width: '70vw', height: '80vh'}}
              />
            )}
          </div>
          {/* down bar */}
          <div className='down_bar'>
            <h2>{ currentIndex +1}번째 image</h2>
          </div>

        </div>
        {/* right bar */}
        <div className='right_bar'>
          <div className='next_image'>
            {selectedFiles.length > 1 ? (
              <img
                src={URL.createObjectURL(selectedFiles[(currentIndex + 1) % selectedFiles.length])}
                alt="폴더에 이미지가 없습니다!"
                style={{ width: '17vw', height: '20vh' }}
              />
            ) : (
              <p>마지막 이미지</p>
            )}
          </div>


        </div>

      </div>
    </div>
  );
};

export default FolderSelector;
