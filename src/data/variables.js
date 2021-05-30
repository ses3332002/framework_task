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
    ruAriaLabelString: 'Русский язык',
    ukAriaLabelString: 'Украинский язык',
    loaderString: 'Загрузка',
  },
  uk: {
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
    returnString: 'Можливо повернути',
    redirectString: 'Можливо переслати',
    headerString: 'Трекінг посилок Нової пошти',
    footerString: 'Версія',
    resultString: 'Результат',
    ruAriaLabelString: 'Російська мова',
    ukAriaLabelString: 'Українська мова',
    loaderString: 'Завантаження',
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

export const appState = {
  lang: 'ru',
  isLoading: false,
  requestedDocuments: [],
  documentsForDownload: [],
  needToBeRendered: true,
  componentElementToRender: null,
  componentFunctionToRender: null,
};

export const freshnessTime = 18000000;
export const appVersion = '1.10';
