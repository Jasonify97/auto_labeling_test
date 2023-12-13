// eslint-disable-next-line
import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
// import Replicate from "replicate";

const FolderSelector = () => {
  const fileInputRef = useRef(null);
  const savePathInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFolderSelect = () => {
    fileInputRef.current.click();
    console.log('저장 파일 경로!:', fileInputRef);
  };

  //handleSelectedFolder : img filter기능
  const handleSelectedFolder = async (event) => {
    const fileList = Array.from(event.target.files);
    const allowedExtensions = ["jpeg", "png", "jpg"];

    const sortedFiles = fileList
      .filter(file => allowedExtensions.some(ext => file.type.endsWith(ext)))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    setSelectedFiles(sortedFiles);

    // 업로드 로직

    if (sortedFiles.length > 0) {
      console.log(sortedFiles)
      const formData = new FormData();

    // 모든 파일을 formData에 추가
    sortedFiles.forEach((file, index) => {
      formData.append(`files`, file); // 필드 이름을 'files'로 변경
    });

      try {
        // 서버에 파일 업로드 요청
        await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('파일 업로드 성공!');
      } catch (error) {
        console.error('파일 업로드 실패:', error.message);
      }
    }


  };
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedFiles.length);
    } else if (event.key === 'ArrowLeft') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedFiles.length) % selectedFiles.length);
    }
  };

  const handleSavePathSelect = () => {
    savePathInputRef.current.click();
  };

  // 새로 추가된 부분: 파일 저장 경로가 변경될 때의 처리
  const handleSavePathChange = (event) => {
    // 여기에서 파일 저장 경로에 대한 처리를 수행하면 됩니다.
    const savePath = event.target.value;
    console.log('저장경로!!:', savePath);
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
          <input
            type="text"
            ref={savePathInputRef}
            style={{ display: 'none' }}
            onChange={handleSavePathChange}
          />
          <button className='btn' onClick={handleFolderSelect}>Upload Folder</button>
          <button className='btn' onClick={handleSavePathSelect}>Download Folder</button>
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
