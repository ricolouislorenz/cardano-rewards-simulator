import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Erlaubt Cross-Origin-Anfragen

@app.route('/api/rewards', methods=['POST'])
def rewards_simulation():
    data = request.get_json()
    initial_reserve = data['initialReserve']
    epochs = data['epochs']
    rho = data['rho']
    tau = data['tau']
    eta = data['eta']
    p = data['p']
    frew = data['frew']

    reserves = [initial_reserve]
    for i in range(1, epochs):
        reward = rho * eta * (tau + (1 - tau) * p * frew) * reserves[-1]
        reserves.append(reserves[-1] * (1 - reward / reserves[-1]))

    return jsonify(reserves)

@app.route('/api/fees', methods=['POST'])
def fees_simulation():
    data = request.get_json()
    initial_reserve = data['initialReserve']
    epochs = data['epochs']
    fees = data['fees']
    eta = data['eta']
    p = data['p']
    frew = data['frew']

    reserves = [initial_reserve]
    for i in range(1, epochs):
        fee_income = fees * eta * p * frew * reserves[-1]
        reserves.append(reserves[-1] + fee_income)

    return jsonify(reserves)

@app.route('/api/other', methods=['POST'])
def other_simulation():
    data = request.get_json()
    initial_reserve = data['initialReserve']
    epochs = data['epochs']
    rho = data['rho']
    tau = data['tau']
    eta = data['eta']
    p = data['p']
    frew = data['frew']
    fees = data['fees']

    reserves = [initial_reserve]
    for i in range(1, epochs):
        reward = rho * eta * (tau + (1 - tau) * p * frew) * reserves[-1]
        fee_income = fees * eta * p * frew * reserves[-1]
        reserves.append(reserves[-1] * (1 - reward / reserves[-1]) + fee_income)

    return jsonify(reserves)

if __name__ == '__main__':
    app.run(debug=True)
