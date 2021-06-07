/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { RequestSet, requestSetStyles } from '../RequestSet/RequestSet';
import { UIStrings } from '../../data/variables';
import { getTrackingData } from '../../data/getTrackingData';
import { useEffect, useState } from '../../framework/hooks.js';
import { requestOptions, url } from '../../data/variables';

import styles from './tracking_form';

// export function TrackingForm({ lang, setLoadingState }) {
export function TrackingForm({ lang }) {
  let [requestedDocuments, setRequestedDocuments] = useState([
    {
      DocumentNumber: '',
      Phone: '',
      result: null,
    },
  ]);
  let [documentsForDownload, setDocumentsForDownload] = useState([]);
  // let [requestСompleted, setRequestCompleted] = useState(true);

  // useEffect(() => {
  //   if (requestСompleted) {
  //     setDocumentsForDownload([]);
  //     // setLoadingState(() => false);
  //     console.log('test');
  //   }
  // }, [requestСompleted]);

  const requestTemplate = {
    modelName: 'TrackingDocument',
    calledMethod: 'getStatusDocuments',
    methodProperties: {
      Language: lang,
    },
  };

  useEffect(() => {
    if (documentsForDownload.length == 0) {
      console.log('nothing to DL');
      return;
    }
    console.log('something to DL');
    requestTemplate.methodProperties.Documents = documentsForDownload;
    requestOptions.body = JSON.stringify(requestTemplate);
    fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log('finishing DL');
        manageResults({
          downloadedResults: result.data,
          requestedDocuments,
          setRequestedDocuments,
          setDocumentsForDownload,
          setRequestCompleted,
        });
      })
      .catch(err => {
        console.error('there was some error:', err);
      });
  }, [documentsForDownload]);

  console.log('form updated');
  console.log(
    'req docs lenght: ',
    requestedDocuments.length,
    'docs: ',
    requestedDocuments.map(item => item.DocumentNumber).join('; '),
  );
  console.log(
    'for dwn lenght: ',
    documentsForDownload.length,
    'docs: ',
    documentsForDownload.map(item => item.DocumentNumber).join('; '),
  );

  return (
    <div className={styles.tracking_form}>
      <form
        name="request_form"
        autocomplete="off"
        onSubmit={event => {
          console.log('form submit');
          // setRequestCompleted(false);
          // updateRequestedDocuments({ event, setRequestedDocuments, requestedDocuments });
          // getTrackingData({
          //   event,
          //   requestedDocuments,
          //   setRequestedDocuments,
          //   documentsForDownload,
          //   setDocumentsForDownload,
          //   setRequestCompleted,
          // });
        }}
        // onChange={event => {
        //   console.log('form changing');
        //   updateRequestedDocuments({ event, setRequestedDocuments, requestedDocuments });
        // }}
      >
        {renderRequestSets(requestedDocuments)}
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
          value={UIStrings[lang].searchButtonString}
          className={styles.request_submit}
        />
        <input
          type="button"
          value={UIStrings[lang].clearButtonString}
          className={styles.request_submit}
          onClick={event => resetForm({ event, setRequestedDocuments })}
        />
      </form>
    </div>
  );

  function renderRequestSets(requestedDocuments) {
    return requestedDocuments.map((item, index) => {
      return (
        <RequestSet
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
}

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

function updateRequestedDocuments({ setRequestedDocuments, requestedDocuments }) {
  const requestSets = Array.from(document.querySelectorAll(`.${requestSetStyles.request_set}`));
  setRequestedDocuments(
    requestSets.map(function (item, index) {
      console.log(item.querySelector('input[name = invoice_number]').value);
      return {
        DocumentNumber: item.querySelector('input[name = invoice_number]').value,
        Phone: item.querySelector('input[name = phone_number]').value,
        result:
          requestedDocuments[index].DocumentNumber ==
          item.querySelector('input[name = invoice_number]').value
            ? requestedDocuments[index].result
            : null,
      };
    }),
  ),
    console.log(requestedDocuments);
  console.log('req docs updated');
  console.log(
    'req docs lenght: ',
    requestedDocuments.length,
    'docs: ',
    requestedDocuments.map(item => item.DocumentNumber).join('; '),
  );
}

function manageResults({
  downloadedResults,
  requestedDocuments,
  setRequestedDocuments,
  setDocumentsForDownload,
  setRequestCompleted,
}) {
  console.log('managing results');
  requestedDocuments.forEach((item, index) => {
    if (item.result == 'gotToBeDownloaded') {
      let resultData = downloadedResults.shift();
      resultData.requestTime = +new Date();
      console.log('for LS:', resultData);
      localStorage.setItem(resultData.Number, JSON.stringify(resultData));
      setRequestedDocuments(requestedDocuments => {
        return [
          ...requestedDocuments.slice(0, index),
          {
            DocumentNumber: item.DocumentNumber,
            Phone: item.Phone,
            result: resultData,
          },
          ...requestedDocuments.slice(index + 1),
        ];
      });
      console.log({
        DocumentNumber: item.DocumentNumber,
        Phone: item.Phone,
        result: resultData,
      });
    }
  });
  console.log('setRequestCompleted(true)');
  // setRequestCompleted(() => true);
}
