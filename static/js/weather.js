let weatherData = {}; // 날씨 데이터를 저장할 객체
let shouldUpdatePrediction = true; // 플래그를 추가하여 업데이트 여부를 제어

async function fetchWeatherData(latitude, longitude) {
    console.log('fetchWeatherData - ', latitude, longitude);

    try {
        const response = await fetch('/receive_location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                latitude: latitude,
                longitude: longitude
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched weather data:', data); // 데이터 확인

        // 날씨 데이터 저장
        weatherData = {
            humidity: data.humidity,
            min_temp: data.min_temperature,
            max_temp: data.max_temperature,
            rainfall: data.precipitation || 0  // 강수량 데이터가 없으면 기본값 0
        };

        // 날씨 정보 표시
        const weatherDiv = document.getElementById('weather');
        if (weatherDiv) {
            weatherDiv.innerHTML = `최고 기온: ${weatherData.max_temp}°C, 최저 기온: ${weatherData.min_temp}°C <br>
                                    강수량: ${weatherData.rainfall}mm, 습도: ${weatherData.humidity}%`;
        }

        // 날씨 데이터가 성공적으로 로드된 후 예측 데이터 요청
        const predictionData = await sendPredictionRequest();

        // 예측 데이터 확인
        if (predictionData && typeof predictionData.mosquitoIndex !== 'undefined') {
            return predictionData; // 예측 데이터 반환
        } else {
            throw new Error('Invalid prediction data received');
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherDiv = document.getElementById('weather');
        if (weatherDiv) {
            weatherDiv.innerHTML = 'Error fetching weather data';
        }
        throw error; // 에러를 호출한 쪽으로 전파
    }
}

async function sendPredictionRequest() {
    const date = document.getElementById('date');
    const date_textContent = date.textContent.trim();

    const [year, month, day] = date_textContent.split(/[.\s]/).filter(Boolean); // 정규 표현식으로 구분

    const fetchData = {
        year: parseFloat(year, 10),
        month: parseFloat(month, 10),
        day: parseFloat(day, 10),
        max_temp: parseFloat(weatherData.max_temp),   // 숫자로 변환
        min_temp: parseFloat(weatherData.min_temp),    // 숫자로 변환
        rainfall: parseFloat(weatherData.rainfall),    // 숫자로 변환
        humidity: parseFloat(weatherData.humidity)     // 숫자로 변환
    };

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchData)
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
        }

        const data = await response.json();
        console.log('Received Prediction Data:', data);

        if (shouldUpdatePrediction) {
            const prediction = data.mosquito_risk_index;
            const mosquitoIndex = data.mosquito_index;

            // Ensure mosquitoIndex and prediction are defined
            if (typeof mosquitoIndex !== 'undefined' && typeof prediction !== 'undefined') {
                document.getElementById('mosq_index').textContent = mosquitoIndex + 1 + ' 단계';
                const formattedPrediction = prediction.toFixed(4);
                document.getElementById('mosq_prediction').textContent = formattedPrediction;

                const mosqPredictionElement = document.getElementById('mosq_prediction');
                mosqPredictionElement.className = '';
                if (mosquitoIndex === 0) {
                    mosqPredictionElement.classList.add('text-black');
                } else if (mosquitoIndex === 1) {
                    mosqPredictionElement.classList.add('text-blue');
                } else if (mosquitoIndex === 2) {
                    mosqPredictionElement.classList.add('text-orange');
                } else if (mosquitoIndex === 3) {
                    mosqPredictionElement.classList.add('text-red');
                }

                const imageResponse = await fetch(`/image?mosquito_index=${mosquitoIndex}`);
                const imageData = await imageResponse.json();
                document.getElementById('mosquito-image').src = imageData.image_url;
            } else {
                console.error('Received data is missing mosquitoIndex or prediction');
            }
        }

        return { mosquitoIndex, prediction }; // 데이터를 반환

    } catch (error) {
        console.error('Error fetching mosquito risk data:', error);
        // 기본값 반환
        return { mosquitoIndex: -1, prediction: 0 }; // 기본값 반환
    }
}
