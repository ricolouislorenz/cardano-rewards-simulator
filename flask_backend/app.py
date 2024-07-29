from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/simulate', methods=['POST'])
def simulate():
    data = request.json
    result = perform_simulation(data)
    return jsonify(result)

def perform_simulation(data):
    rho = data['rho']
    tau = data['tau']
    eta = data['eta']
    p = data['p']
    frew = data['frew']
    stake = data['stake']
    pool = data['pool']
    
    result = {
        'rho': rho,
        'tau': tau,
        'eta': eta,
        'p': p,
        'frew': frew,
        'stake': stake,
        'pool': pool,
        'rewards': stake * eta * p * frew * (1 - tau)
    }
    return result

if __name__ == '__main__':
    app.run(debug=True)
