const kilometersToMiles = (kilometers) => {

  let miles = kilometers / 1.609
  return miles
}

const celciusToFahrenheit = (temperatureCelcius) => {
  let temperatureFarenheit = (temperatureCelcius * 9/5) + 32
  return temperatureFarenheit
}

const kilogramsToPounds = (kilograms) => {
  let pound = kilograms / 2.205
  return pound
}


export {kilometersToMiles , celciusToFahrenheit, kilogramsToPounds}