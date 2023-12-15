from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        files = request.files.getlist(files)
        for file in files:
            file.save('hi')

        return '파일 업로드 성공', 200
    except Exception as e:
        return f'파일 업로드 중 오류 발생: {e}', 500

app.run(host='localhost', port=3001, debug=True)
