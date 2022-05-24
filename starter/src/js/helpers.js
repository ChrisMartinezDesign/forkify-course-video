////////////////////////////////
// Every project has this file,
// but it is seperate from the
// architecture

import { TIMEOUT_SECONDS } from './config';

// Used to safe guard from long loading times
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Generate an AJAX call to the Forkify API
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([
      fetchPromise,
      timeout(TIMEOUT_SECONDS),
    ]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} - ${response.status}`);

    return data;
  } catch (error) {
    throw error;
  }
};

// Legacy versions of sending AJAX calls
/*
export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} - ${response.status}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const response = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SECONDS),
    ]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} - ${response.status}`);

    return data;
  } catch (error) {
    throw error;
  }
};
*/
