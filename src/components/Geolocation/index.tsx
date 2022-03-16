import React, { useState } from 'react';
import * as S from './styles';

const Geolocation : React.VFC = () => {
    const [showCoordinatesButton, setShowCoordinatesButton] = useState(true)
  const [showGeolocationButton, setShowGeolocationButton] = useState(true)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLong] = useState(0)
  const [browserSupported, setBrowserSupported] = useState('')
  const [geolocationDenied, setGeolocationDenied] = useState('')

  const canIGetCoords = () => {
    navigator.permissions.query({ name: 'geolocation' }).then( result => {
      console.log('resultState', result.state)
      if(result.state === 'denied') {
        setGeolocationDenied('Seu navegador está bloqueado para Geolocalização. Vá até as configurações e altere manualmente.')
        return
      }

      if(result.state === 'prompt') {
        setGeolocationDenied("Você ainda não habilitou a Geolocalização")
      }

      setShowCoordinatesButton(false)
    })
  }

  const isSuported = () => {
    console.log('navigator.geolocation', navigator.geolocation)
    if(navigator.geolocation) {
      setShowGeolocationButton(false)
      setBrowserSupported('Seu navegador tem suporte para Geolocalização')
    } else {
      setBrowserSupported('Seu navegador não tem suporte para Geolocalização')
    }
  } 

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('position', position)
      setLatitude(position.coords.latitude)
      setLong(position.coords.longitude)
    })
  }

  return (
    <div className="App">
      <S.Container>
        <h1>Olá</h1>
        <button onClick={isSuported}>Geolocalização funciona?</button>
        <p>{browserSupported}</p>
        <button disabled={showGeolocationButton} onClick={canIGetCoords}>
          Está permitido?
        </button>
        <p>{geolocationDenied}</p>
        <button  disabled={showCoordinatesButton} onClick={getCoords}>
          Latitude e Longitude
        </button>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </S.Container>
    </div>
  );
}

export default Geolocation
