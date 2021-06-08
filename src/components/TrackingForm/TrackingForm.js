import React, { useEffect, useState } from 'react';
import { Result } from '../Result/Result';
import { UIStrings, requestOptions, url } from '../../data/variables';
import { getTrackingData } from '../../data/getTrackingData';

import styles from './tracking_form';

export function TrackingForm({ lang, setLoadingState }) {
  let [requestedDocuments, setRequestedDocuments] = useState({
    DocumentNumber: '',
    Phone: '',
    result: null,
  });

  let [documentsForDownload, setDocumentsForDownload] = useState({});

  const requestTemplate = {
    modelName: 'TrackingDocument',
    calledMethod: 'getStatusDocuments',
    methodProperties: {
      Language: lang,
    },
  };

  useEffect(() => {
    setLoadingState(true);
    requestTemplate.methodProperties.Documents = [documentsForDownload];
    requestOptions.body = JSON.stringify(requestTemplate);

    fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        manageResults({
          downloadedResults: result.data,
          requestedDocuments,
          setRequestedDocuments,
        });
      })
      .catch(err => {
        console.error('there was some error:', err);
      })
      .finally(() => setLoadingState(false));
  }, [documentsForDownload]);

  return (
    <div className={styles.tracking_form}>
      <form
        name="request_form"
        autoComplete="off"
        onSubmit={event => {
          getTrackingData({
            event,
            requestedDocuments,
            setRequestedDocuments,
            setDocumentsForDownload,
          });
        }}
      >
        <div className={styles.request_set}>
          <div className={styles.request_item}>
            <input
              type="text"
              id="invoice_number"
              name="invoice_number"
              value={requestedDocuments.DocumentNumber}
              placeholder=" "
              required
              onChange={event =>
                setRequestedDocuments(requestedDocuments => ({
                  ...requestedDocuments,
                  DocumentNumber: event.target.value,
                }))
              }
            />
            <label htmlFor="invoice_number">{UIStrings[lang].invoiceString}</label>
          </div>
          <div className={styles.request_item}>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={requestedDocuments.Phone}
              pattern="[0-9]{0,10}"
              placeholder=" "
              onChange={event =>
                setRequestedDocuments(request => ({
                  ...requestedDocuments,
                  Phone: event.target.value,
                }))
              }
            />
            <label htmlFor="phone_number">{UIStrings[lang].phoneString}</label>
          </div>
          <div className={styles.tracking_result}>
            <Result lang={lang} result={requestedDocuments.result} />
          </div>
        </div>
        <input
          type="submit"
          key={'submit'}
          value={UIStrings[lang].searchButtonString}
          className={styles.request_submit}
        />
        <input
          type="button"
          key={'button'}
          value={UIStrings[lang].clearButtonString}
          className={styles.request_submit}
          onClick={event => resetForm({ event, setRequestedDocuments })}
        />
      </form>
    </div>
  );

  function resetForm({ setRequestedDocuments }) {
    setRequestedDocuments({
      DocumentNumber: '',
      Phone: '',
      result: null,
    });
  }

  function manageResults({ downloadedResults, requestedDocuments, setRequestedDocuments }) {
    if (requestedDocuments.result == 'gotToBeDownloaded') {
      let resultData = downloadedResults.shift();
      resultData.requestTime = +new Date();
      localStorage.setItem(resultData.Number, JSON.stringify(resultData));
      setRequestedDocuments(requestedDocuments => ({
        ...requestedDocuments,
        result: resultData,
      }));
    }
  }
}
