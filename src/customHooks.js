import { useEffect, useState } from './framework/hooks.js';

export const appHooks = () => {
  const [lang, setLang] = useState('ru');
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    document.querySelector('HTML').setAttribute('lang', lang);
  });

  return {
    lang,
    setLang,
    loadingState,
    setLoadingState,
  };
};

// export const useWeather = () => {
//   const [currentCity, setCurrentCity] = useState('');
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [weatherData, setWeatherData] = useState({});
//
//   useEffect(() => {
//     if (currentCity) {
//       loadOpenWeatherMapData(currentCity)
//         .then(data => {
//           const { message, code } = data;
//
//           if (code !== '200' && message) throw Error(message);
//
//           setError(null);
//           setWeatherData(data);
//         })
//         .catch(setError)
//         .finally(() => setIsLoading(false));
//     }
//   }, [currentCity]);
//
//   return {
//     currentCity,
//     setCurrentCity,
//     error,
//     isLoading,
//     weatherData,
//   };
// };
