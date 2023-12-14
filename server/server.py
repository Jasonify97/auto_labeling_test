from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # 'files' 키가 request.files 딕셔너리에 있는지 확인
        if 'files' not in request.files:
            return '파일이 없습니다', 400

        # 'files' 키의 파일 목록을 가져옴
        files = request.files.getlist('files')

        # 각 파일을 처리
        for file in files:
            # 파일을 원하는 위치에 저장하거나 필요한 다른 작업 수행
            file.save(f'/uploads/{file.filename}')

        return '파일 업로드 성공', 200
    except Exception as e:
        return f'파일 업로드 중 오류 발생: {e}', 500

app.run(port=5000, debug=True)
