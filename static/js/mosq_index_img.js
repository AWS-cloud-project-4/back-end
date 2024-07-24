let shouldUpdatePrediction = true; // 플래그를 추가하여 업데이트 여부를 제어

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
        }

        return { mosquitoIndex, prediction }; // 데이터를 반환

    } catch (error) {
        console.error('Error fetching mosquito risk data:', error);
        throw error; // 에러를 호출한 쪽으로 전달
    }
}
