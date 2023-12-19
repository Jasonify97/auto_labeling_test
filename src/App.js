// eslint-disable-next-line
import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const FolderSelector = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadFiles, uploadedFiles] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [pythonResult, setPythonResult] = useState({});

  const handleFolderSelect = () => {
    fileInputRef.current.click();
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
      const formData = new FormData()

    sortedFiles.forEach((file, index) => {
      formData.append(`files`, file); // 필드 이름을 'files'로 변경
    });

      try {
        // 서버에 파일 업로드 요청
        const request1 = await axios.post('http://localhost:3002/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const request2 = await axios.post('http://127.0.0.1:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        await Promise.all([request1, request2]);
        console.log('파일 업로드 성공!');
      } catch (error) {
        console.error('APP.js파일 업로드 실패:', error.message);
      }
    }
  };

  const executePythonScript = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/run-script');
      setPythonResult(response.data);
    } catch (error) {
      console.error('Error executing PYthon xcript:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedFiles.length);
    } else if (event.key === 'ArrowLeft') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedFiles.length) % selectedFiles.length);
    }
  };
  const imagesContext = require.context('/server/output/', false);

  // 이미지 파일명 추출 및 매핑
  const images = imagesContext.keys().map(imagesContext);

  useEffect(() => {
    // Add event listener for the right arrow key
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, selectedFiles]);

  useEffect(() => {
    // Add event listener for the right arrow key
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [uploadFiles, uploadedFiles]);
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
          <button className='btn' onClick={handleFolderSelect}>Upload Folder</button>
          <div>
            <button className='btn' onClick={executePythonScript}>Run Model</button>
          </div>
          <button className='btn' onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedFiles.length)}>Next</button>
          <button className='btn' onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedFiles.length) % selectedFiles.length)}>Previous</button>
        </div>

        {/* main */}
        <div className='main'>
          <div className='image'>
            {selectedFiles.length > 1 && (
              <img
                src={URL.createObjectURL(selectedFiles[currentIndex])}
                alt="폴더에 이미지가 없습니다!"
                style={{ width: '70vw', height: '40vh'}}
              />
            )}
          </div>
          <div>
            {
              <img
                src={images[currentIndex]}
                alt="Run Model을 눌러주세요"
                style={{ width: '70vw', height: '40vh'}}
              />
            }
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
