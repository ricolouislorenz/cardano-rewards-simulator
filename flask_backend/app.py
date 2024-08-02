from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Blockfrost API Setup
BLOCKFROST_API_URL = "https://cardano-mainnet.blockfrost.io/api/v0"
BLOCKFROST_API_KEY = "mainnetv6tH8NtnDAY0QMYOaerUu9ncGbXQNv4j"

headers = {
    "project_id": BLOCKFROST_API_KEY
}

def get_current_data():
    response = requests.get(f"{BLOCKFROST_API_URL}/blocks/latest", headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to fetch data"}

@app.route('/api/currentData', methods=['GET'])
def current_data():
    data = get_current_data()
    return jsonify(data)

@app.route('/api/simulate', methods=['POST'])
def simulate():
    parameters = request.json
    simulation_results = calculate_simulation(parameters)
    return jsonify(simulation_results)

def calculate_simulation(parameters):
    stakeAmount = parameters.get('stakeAmount')
    poolPerformance = parameters.get('poolPerformance')
    initialReserve = parameters.get('initialReserve')
    epochs = parameters.get('epochs')
    rho = parameters.get('rho')
    tau = parameters.get('tau')
    eta = parameters.get('eta')
    p = parameters.get('p')
    frew = parameters.get('frew')
    fees = parameters.get('fees')
    
    results = [initialReserve]
    for i in range(1, epochs):
        results.append(results[-1] * (1 - rho))
    
    return results

if __name__ == '__main__':
    app.run(port=5000)
