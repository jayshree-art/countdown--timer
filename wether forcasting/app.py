from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

weather_db = {
    "new york": {
        "city": "Brooklyn, New York, USA",
        "temperature": 18,
        "description": "Stormy with partly cloudy",
        "high": 29,
        "low": 12,
        "date": "Friday, January 4"
    },
    "liverpool": {
        "city": "Liverpool, UK",
        "temperature": 16,
        "description": "Partly Cloudy",
        "high": 22,
        "low": 10,
        "date": "Friday, January 4"
    },
    "palermo": {
        "city": "Palermo, Italy",
        "temperature": -2,
        "description": "Rain/Thunder",
        "high": 5,
        "low": -4,
        "date": "Friday, January 4"
    }
}

OPENWEATHER_API_KEY = "4ada243f77006b3fd439ac844a1bf900"  # <-- Replace with your OpenWeatherMap API key

@app.route('/weather')
def get_weather():
    city = request.args.get('city', 'new york').lower()
    data = weather_db.get(city)
    if data:
        return jsonify(data)
    # If not in demo DB, try OpenWeatherMap
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
        resp = requests.get(url)
        if resp.status_code != 200:
            raise Exception("City not found")
        w = resp.json()
        # ...inside your OpenWeatherMap fetch block...
          # ...inside your OpenWeatherMap fetch block...
        result = {
            "city": w["name"],
            "temperature": w["main"]["temp"],
            "description": w["weather"][0]["description"].title(),
            "high": w["main"]["temp_max"],
            "low": w["main"]["temp_min"],
            "date": "",
            "lat": w["coord"]["lat"],
            "lon": w["coord"]["lon"]
                }
        return jsonify(result)
    except Exception:
        return jsonify({
            "city": city.title(),
            "temperature": 0,
            "description": "City not found!",
            "high": 0,
            "low": 0,
            "date": ""
        }), 404

if __name__ == '__main__':
    app.run(debug=True)