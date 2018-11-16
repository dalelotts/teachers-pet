const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'questions.json'), (err, data) => {
  if (err) throw err;

  const questions = JSON.parse(data);

  const sortedQuestions = questions.sort((sourceQuestion, targetQuestion) => {
    return sourceQuestion.subject.localeCompare(targetQuestion.subject);
  });

  const sortedData = JSON.stringify(sortedQuestions, null, 2);

  fs.writeFile(path.join(__dirname, 'questions.json'), sortedData, (err) => {
    if (err) throw err;

    console.log('The sorted questions file has been saved!');
  });
});