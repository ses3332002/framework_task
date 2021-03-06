export const topLevelFrameBlocks = ['header', 'main', 'footer'];

export const UIStrings = {
  ru: {
    invoiceString: 'Введите номер квитанции',
    phoneString: 'Введите номер телефона',
    searchButtonString: 'Искать',
    clearButtonString: 'Очистить',
    routeString: 'Маршрут',
    weightString: 'Вес, кг',
    placesString: 'Мест',
    statusString: 'Текущий статус',
    requestString: 'Заказать',
    yesString: 'да',
    noString: 'нет',
    returnString: 'Можно вернуть',
    redirectString: 'Можно переслать',
    headerString: 'Трекинг посылок Новой почты',
    footerString: 'Версия',
    resultString: 'Результат',
  },
  ua: {
    invoiceString: 'Введіть номер квитанції',
    phoneString: 'Введіть номер телефону',
    searchButtonString: 'Шукати',
    clearButtonString: 'Очистити',
    routeString: 'Маршрут',
    weightString: 'Вага, кг',
    placesString: 'Місць',
    statusString: 'Поточний статус',
    requestString: 'Замовити',
    yesString: 'так',
    noString: 'ні',
    returnString: 'Можна повернути',
    redirectString: 'Можна переслати',
    headerString: 'Трекінг посилок Нової пошти',
    footerString: 'Версія',
    resultString: 'Результат',
  },
};

export const url = 'https://api.novaposhta.ua/v2.0/json/';

export const requestOptions = {
  // contentType: 'application/json',
  mode: 'cors',
  cache: 'no-cache',
  redirect: 'follow',
  method: 'POST',
  // dataType: 'jsonp',
};

export const freshnessTime = 18000000;
export const appVersion = '1.4';
