function fetchWeatherData(latitude, longitude) {
    fetch('http://localhost:5500/receive_location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    })
    .then(response => response.json())
    .then(data => {
        const weatherDiv = document.getElementById('weather');
        if (weatherDiv) {
            // 정규 표현식으로 소수점 이하 제거
            const formatValue = (value) => {
                if (typeof value === 'string') {
                    // 문자열로 소수점 이하 제거
                    return value.replace(/\.\d+/, '');
                } else if (typeof value === 'number') {
                    // 숫자로 소수점 이하 제거
                    return value.toString().replace(/\.\d+/, '');
                }
                return 'N/A';
            };

            weatherDiv.innerHTML = `
                <span>습도: ${formatValue(data.humidity)}</span> %
                <span>최저 기온: ${formatValue(data.min_temperature)}</span>℃
                <span>최고 기온: ${formatValue(data.max_temperature)}</span>℃
            `;
        } else {
            console.error('Error: Weather element not found');
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        const weatherDiv = document.getElementById('weather');
        if (weatherDiv) {
            weatherDiv.innerHTML = 'Error fetching weather data';
        }
    });
}

/* <span>강수량: ${data.precipitation || 'N/A'}</span> */