import React, { useEffect, useState } from 'react';
import { RequestSet } from '../RequestSet/RequestSet';
import { UIStrings, requestOptions, url } from '../../data/variables';
import { getTrackingData } from '../../data/getTrackingData';

import styles from './tracking_form';

export function TrackingForm({ lang, setLoadingState }) {
  let [requestedDocuments, setRequestedDocuments] = useState([
    {
      DocumentNumber: '',
      Phone: '',
      result: null,
    },
  ]);

  let [documentsForDownload, setDocumentsForDownload] = useState([]);

  const requestTemplate = {
    modelName: 'TrackingDocument',
    calledMethod: 'getStatusDocuments',
    methodProperties: {
      Language: lang,
    },
  };

  useEffect(() => {
    if (documentsForDownload.length == 0) {
      return;
    } else {
      setLoadingState(true);
      requestTemplate.methodProperties.Documents = documentsForDownload;
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
            setDocumentsForDownload,
          });
        })
        .catch(err => {
          console.error('there was some error:', err);
        })
        .finally(() => setLoadingState(false));
    }
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
        {renderRequestSets(requestedDocuments, setRequestedDocuments)}
        <div className={styles.request_set_buttons}>
          <input
            type="button"
            className={styles.request_add_set}
            onClick={event => addRequestSet({ event, requestedDocuments, setRequestedDocuments })}
            value="+"
          />
          <input
            type="button"
            className={styles.request_remove_set}
            onClick={event =>
              removeRequestSet({ event, requestedDocuments, setRequestedDocuments })
            }
            value="-"
            disabled={!(requestedDocuments.length > 1)}
          />
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
    setRequestedDocuments([
      {
        DocumentNumber: '',
        Phone: '',
        result: null,
      },
    ]);
  }

  function addRequestSet({ requestedDocuments, setRequestedDocuments }) {
    setRequestedDocuments(requestedDocuments => [
      ...requestedDocuments,
      {
        DocumentNumber: '',
        Phone: '',
        result: null,
      },
    ]);
  }

  function removeRequestSet({ requestedDocuments, setRequestedDocuments }) {
    setRequestedDocuments(requestedDocuments => requestedDocuments.slice(0, -1));
  }

  function renderRequestSets(requestedDocuments, setRequestedDocuments) {
    return requestedDocuments.map((item, index) => {
      return (
        <RequestSet
          key={index}
          lang={lang}
          DocumentNumber={item.DocumentNumber}
          Phone={item.Phone}
          result={item.result}
          requestSetIndex={index}
          setRequestedDocuments={setRequestedDocuments}
          requestedDocuments={requestedDocuments}
        />
      );
    });
  }

  function manageResults({
    downloadedResults,
    requestedDocuments,
    setRequestedDocuments,
    setDocumentsForDownload,
  }) {
    requestedDocuments.forEach((item, index) => {
      if (item.result == 'gotToBeDownloaded') {
        let resultData = downloadedResults.shift();
        resultData.requestTime = +new Date();
        localStorage.setItem(resultData.Number, JSON.stringify(resultData));
        setRequestedDocuments(requestedDocuments => [
          ...requestedDocuments.slice(0, index),
          {
            DocumentNumber: item.DocumentNumber,
            Phone: item.Phone,
            result: resultData,
          },
          ...requestedDocuments.slice(index + 1),
        ]);
      }
    });
    setDocumentsForDownload([]);
  }
}
