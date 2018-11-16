const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'questions.json'), (err, data) => {
  if (err) throw err;

  const questions = JSON.parse(data);

  const sortedQuestions = questions.sort((sourceQuestion, targetQuestion) => {
    let result = sourceQuestion.subject.localeCompare(targetQuestion.subject);

    if (result === 0) {
      result = sourceQuestion.stem.localeCompare(targetQuestion.stem)
    }
    return result;
  });

  const sortedData = JSON.stringify(sortedQuestions, null, 2);

  fs.writeFile(path.join(__dirname, 'questions.json'), sortedData, (err) => {
    if (err) throw err;

    console.log('The sorted questions file has been saved!');
  });
});