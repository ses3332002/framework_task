import React, { useState } from 'react';
import { UIStrings, requestOptions, url } from '../../data/variables';
import styles from './returning_order';

export default function ReturningOrder({ returning, lang, number }) {
  const returnStatuses = ['canBe', 'done', 'fault'];
  let [returnStatus, setReturnStatus] = useState(returnStatuses[0]);

  function getReturnButtonString() {
    switch (returnStatus) {
      case returnStatuses[0]:
        return UIStrings[lang].returnOrderString;
      case returnStatuses[1]:
        return UIStrings[lang].returnOrderDoneString;
      case returnStatuses[2]:
        return UIStrings[lang].returnOrderFaultString;
    }
  }

  const returningTemplate = {
    apiKey: process.env.API_KEY,
    modelName: 'AdditionalService',
    calledMethod: 'save',
    methodProperties: {
      Reason: '7d07b1de-1d6d-11e4-acce-0050568002cf', // just one of some options
      SubtypeReason: 'faaeb2b9-1d6d-11e4-acce-0050568002cf', // just one of some options
      OrderType: 'orderCargoReturn',
    },
  };

  function returnParcel(returningData) {
    returningTemplate.methodProperties.IntDocNumber = number;
    returningTemplate.methodProperties.ReturnAddressRef = returningData.Ref;
    returningTemplate.methodProperties.PaymentMethod = returningData.NonCash ? 'NonCash' : 'Cash';

    requestOptions.body = JSON.stringify(returningTemplate);
    fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (!result.success) {
          setReturnStatus(returnStatuses[2]);
        } else {
          setReturnStatus(returnStatuses[1]);
        }
      })
      .catch(err => {
        console.error('there was some error:', err);
      });
  }

  if (!returning) {
    return null;
  } else {
    return (
      <div className={styles.return_order}>
        <span className={styles.return_order_info}>{returning.info}</span>
        <input
          type="button"
          className={styles.request_action}
          disabled={!(returning.returnAbility && returnStatus === returnStatuses[0])}
          value={getReturnButtonString()}
          onClick={event => returnParcel(returning.data)}
        />
      </div>
    );
  }
}
