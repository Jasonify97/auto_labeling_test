from execute_fsam import FSAM
from flask import Flask, jsonify, request
from flask_cors import CORS


fs = FSAM()
app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:3000"}})
app.config['DEBUG'] = True

@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files.getlist('files')
    json_data = {}
    for i, file in enumerate(uploaded_file):
        json_data[f'filename{i}'] = file.filename
        i+=1
    with open('./txt_files/test.txt', "w") as f:
        for i, file in enumerate(json_data):
            f.write(json_data[f'filename{i}']+'\n')
    return jsonify({'message': 'File uploaded successfully'})


@app.route('/run-script', methods=['GET'])
def run_script():
    results, output_path = fs.execute_fsam('/home/youna/Project/auto_labeling/images/cat.jpg')
    return jsonify({'results': results, 'output_path': output_path})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
