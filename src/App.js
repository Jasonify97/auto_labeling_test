import React, { useRef, useState } from 'react';
import './App.css'

const FolderSelector = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFolderSelect = () => {
    fileInputRef.current.click();
  };
  //handleSelectedFolder : img filter기능
  const handleSelectedFolder = (event) => {
    const fileList = Array.from(event.target.files);
    const allowedExtensions = ["jpeg", "png", "jpg"];
    setSelectedFiles(fileList.filter(file => {
      return allowedExtensions.some(ext => file.type.endsWith(ext));
    }));

  };

  return (

    <div className='App'>
      {/* header */}
      <header className="black-nav">
        <h3>Auto Labeling</h3>
      </header>

      {/* side bar */}
      <div className='body'>
        <div className='side_bar'>
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
        {/* main*/}
        <div className='main'>
          <h2>Select a Folder</h2>
          <div className='image'>
            {selectedFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="폴더에 이미지가 없습니다!"
                  style={{ width: '50vw', height: '50vh', objectFit: 'cover'}}
                />
              ))}
          </div>
        </div>
      </div>




      {/* {selectedFiles.length > 0 && (
        <div>
          <h3>Images in sthe selected folder:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '5px' }}
              />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default FolderSelector;
