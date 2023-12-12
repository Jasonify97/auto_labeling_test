import React, { useRef, useState } from 'react';

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

      {selectedFiles.length > 0 && (
        <div>
          <h3>Images in the selected folder:</h3>
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
      )}
    </div>
  );
};

export default FolderSelector;
