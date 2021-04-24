export const topLevelFrameBlocks = ['header', 'main', 'footer'];

export const UIStrings = {
  invoiceString: 'Введите номер квитанции',
  phoneString: 'Введите номер телефона',
  buttonString: 'Искать',
  routeString: 'Маршрут',
  weightString: 'Вес, кг',
  placesString: 'Мест',
  statusString: 'Текущий статус',
  requestString: 'Заказать',
  yesString: 'да',
  noString: 'нет',
  returnString: 'Можно вернуть',
  redirectString: 'Можно переслать',
};

export const topLevelStrings = {
  headerString: 'Трекинг посылок Новой почты',
  footerString: 'Версия 1.1',
  resultString: 'Результат',
};

// export const apiKey = '797cc99d2a4af108e6d6770516130d77';
export const url = 'https://api.novaposhta.ua/v2.0/json/';

export const requestOptions = {
  contentType: 'application/json',
  mode: 'cors',
  cache: 'no-cache',
  redirect: 'follow',
  method: 'POST',
  dataType: 'jsonp',
};
