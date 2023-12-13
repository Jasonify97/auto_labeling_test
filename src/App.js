import React, { useRef, useState, useEffect } from 'react';

const FolderSelector = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFolderSelect = () => {
    fileInputRef.current.click();
  };

  const handleSelectedFolder = (event) => {
    const fileList = Array.from(event.target.files);
    // Filter files to display only images
    const selectedImages = fileList.filter(file => file.type.startsWith('image/'));
    setSelectedFiles(selectedImages);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 39) {
      // Right arrow key (key code 39)
      console.log('Right arrow key pressed!');
      // Perform your desired action here when the right arrow key is pressed
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigateToNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      // Increment the index, but loop back to the first image if at the end
      return prevIndex === selectedFiles.length - 1 ? 0 : prevIndex + 1;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 39) {
        // Right arrow key (key code 39)
        navigateToNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex, selectedFiles]);

  return (
    <div>
      <h2>Select a Folder</h2>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        directory=""
        webkitdirectory=""
        onChange={handleSelectedFolder}
      />
      <button onClick={handleFolderSelect}>Select Folder</button>

      <img 
        src={selectedFiles[currentImageIndex]} 
        alt={`Image ${currentImageIndex + 1}`}
        style={{ margin: '5px' }}
        />
      {selectedFiles.length > 0 && (
        <div>
          <h3>Images in the selected folder:</h3>
          <div>
            {selectedFiles.map((file, index) => (
              <div key={index}>
                {/* <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ margin: '5px' }}                  
                /> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderSelector;
