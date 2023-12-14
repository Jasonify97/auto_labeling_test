const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 업로드된 파일을 저장할 디렉토리 설정
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // 업로드된 파일의 이름 설정
  },
});

const upload = multer({ storage: storage });

// 업로드된 파일 처리
app.post('/upload', upload.array('files'), (req, res) => {
  const uploadedFiles = req.files;
  console.log(uploadedFiles)
  res.send('Files uploaded successfully');
});

// 다운로드할 파일 제공
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'example.txt'); // 다운로드할 파일 경로 설정
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
