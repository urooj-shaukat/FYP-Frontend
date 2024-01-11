import React, { useState } from 'react';

function generateRandomString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

export function generateArrayTestCases(arraySize, numTestCases, startRange, endRange, dataType) {
  const testCases = [];
  for (let i = 0; i < numTestCases; i++) {
    const testCase = [];
    for (let j = 0; j < arraySize; j++) {
      let randomValue;
      
      if (dataType === "int") {
        randomValue = Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
      } else if (dataType === "float") {
        randomValue = parseFloat((Math.random() * (endRange - startRange) + startRange).toFixed(3));
      } else if (dataType === "string") {
        const stringLength = Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
        randomValue = generateRandomString(stringLength);
      }
      
      testCase.push(randomValue);
    }

    // Push the testCase as an object with the "input" property
    testCases.push({ input: JSON.stringify(testCase) });
  }
  return testCases;
}
