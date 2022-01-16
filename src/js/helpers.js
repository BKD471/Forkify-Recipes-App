//This file will contain methods that we'll reuse over and over
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeOut = seconds => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Bad request timed out after ${seconds} seconds`));
    }, seconds * 1000);
  });
};

//this func will take a url and return its json
export const getJSON = async url => {
  try {
    const res = await Promise.race([fetch(url), timeOut(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};
