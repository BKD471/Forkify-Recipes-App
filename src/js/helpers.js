//This file will contain methods that we'll reuse over and over
import { TIMEOUT_SEC } from './config.js';

const timeOut = seconds => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Bad request timed out after ${seconds} seconds`));
    }, seconds * 1000);
  });
};

export const AJAX = async (url, uploadData = undefined) => {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeOut(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};
