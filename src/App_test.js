import React, { useState, useEffect } from 'react';

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSelectedFolder = (event) => {
    const fileList = Array.from(event.target.files);
    setSelectedFiles(fileList);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigateToNextImage = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      // Increment the index, but loop back to the first image if at the end
      if (direction === 'right') {
        return prevIndex === selectedFiles.length - 1 ? 0 : prevIndex + 1;
      }
      else if (direction === 'left') {
        return prevIndex === 0 ? selectedFiles.length -1 : prevIndex -1;
      }
      return prevIndex
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 39) {
        // Right arrow key (key code 39)
        navigateToNextImage('right');
      }
      else if (event.keyCode === 37) {
        navigateToNextImage('left')
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex]); 

  // Get the pixel
  const originalImageWidth = selectedFiles[currentImageIndex].width; // Original image width
  const originalImageHeight = selectedFiles[currentImageIndex].height; // Original image height

  const scaledObjects = data.objects.map((object) => {
    // Scale the coordinates based on the original image's dimensions
    const scaledX = (object.x * originalImageWidth) / data.width;
    const scaledY = (object.y * originalImageHeight) / data.height;
    const scaledWidth = (object.width * originalImageWidth) / data.width;
    const scaledHeight = (object.height * originalImageHeight) / data.height;
  });

  return (
    <div>
      <h2>Select a Folder</h2>
      <input
        type="file"
        style={{ display: 'none' }}
        directory=""
        webkitdirectory=""
        onChange={handleSelectedFolder}
      />
      <button onClick={() => document.querySelector('input[type="file"]').click()}>
        Select Folder
      </button>

      {selectedFiles.length > 0 && (
        <img 
          src={URL.createObjectURL(selectedFiles[currentImageIndex])} 
          alt={selectedFiles} 
          style={{ margin: '5px' }}
        />
      )}
    </div>
  );
};

export default App;
