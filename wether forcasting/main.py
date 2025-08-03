from flask import Flask, request, jsonify

app = Flask(__name__)

# Example weather data (replace with your real data or fetch from an API)
weather_data = {
    "city": "London",
    "temperature": 22,
    "description": "Partly cloudy",
    "humidity": 60
}

@app.route('/weather', methods=['GET'])
def get_weather():
    # You can get query parameters like city from the request if needed
    city = request.args.get('city', 'London')
    # Here, just return the example data
    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True)