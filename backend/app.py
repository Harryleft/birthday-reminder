from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data/birthdays.json'

def load_birthdays():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('birthdays', [])
    return []

def save_birthdays(birthdays):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump({'birthdays': birthdays}, f, ensure_ascii=False, indent=2)

@app.route('/api/birthday/list', methods=['GET'])
def get_birthdays():
    return jsonify(load_birthdays())

@app.route('/api/birthday/add', methods=['POST'])
def add_birthday():
    birthday = request.json
    if 'type' not in birthday:
        return jsonify({'error': 'Missing type field'}), 400
    
    birthday['lunar_date'] = birthday.get('lunar_date', {
        'year': None,
        'month': None,
        'day': None
    })
    birthday['solar_date'] = birthday.get('solar_date', {
        'year': None,
        'month': None,
        'day': None
    })
    
    birthdays = load_birthdays()
    birthday['id'] = str(len(birthdays) + 1)
    birthdays.append(birthday)
    save_birthdays(birthdays)
    return jsonify(birthday)

@app.route('/api/birthday/update/<id>', methods=['PUT'])
def update_birthday(id):
    birthdays = load_birthdays()
    birthday = request.json
    for i, b in enumerate(birthdays):
        if b['id'] == id:
            if 'name' in birthday:
                birthdays[i]['name'] = birthday['name']
            if 'type' in birthday:
                birthdays[i]['type'] = birthday['type']
            if 'lunar_date' in birthday:
                birthdays[i]['lunar_date'].update(birthday['lunar_date'])
            if 'solar_date' in birthday:
                birthdays[i]['solar_date'].update(birthday['solar_date'])
            if 'notes' in birthday:
                birthdays[i]['notes'] = birthday['notes']
            save_birthdays(birthdays)
            return jsonify(birthdays[i])
    return jsonify({'error': 'Birthday not found'}), 404

@app.route('/api/birthday/delete/<id>', methods=['DELETE'])
def delete_birthday(id):
    birthdays = load_birthdays()
    birthdays = [b for b in birthdays if b['id'] != id]
    save_birthdays(birthdays)
    return '', 204

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(port=5000, debug=True) 