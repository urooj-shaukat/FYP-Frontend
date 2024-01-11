function generateRandomValue(dataType, startRange, endRange) {
    if (dataType === "int") {
      return Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
    } else if (dataType === "float") {
      return parseFloat((Math.random() * (endRange - startRange) + startRange).toFixed(3));
    } else if (dataType === "string") {
      const stringLength = Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
      return generateRandomString(stringLength);
    }
  }
  
  function generateRandomString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const maxCharIndex = characters.length - 1;
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * (maxCharIndex + 1));
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  
  export function formatTestCasesAsObjects(numInputs, numTestCases, startRange, endRange, dataType) {
    const formattedTestCases = [];
    for (let i = 0; i < numTestCases; i++) {
      const values = [];
      for (let j = 0; j < numInputs; j++) {
        const randomValue = generateRandomValue(dataType, startRange, endRange);
        values.push(randomValue);
      }
      formattedTestCases.push({ input: values.join(', ') });
    }
    console.log(formattedTestCases)
    return formattedTestCases;
  }
  