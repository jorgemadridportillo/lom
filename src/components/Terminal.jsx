import React from 'react';
import {TerminalLine} from './TerminalLine';
import {useState, useEffect} from 'react';
import {Controller} from '../Controller';

export function Terminal() {
  const [lines, setLines] = useState([{ text: "Welcome human, the test has begun, let the machine gods decide your destiny, good luck..." , type:"text"}]);
  
  function onQuestionAnswered() {
    if(!Controller.isReady) { return; }

    const lastQuestionIndex = Controller.getCurrentQuestionIndex();
    const nextQuestion = Controller.getNextQuestion();
    const currentQuestionIndex = Controller.getCurrentQuestionIndex();

    // Show answers
    var answerLine={};
    const incorrectText = "Incorrect!, the correct answer was: ";
    if(lastQuestionIndex >= 0) {
      const lastQuestionLine = lines.find((line) => {  return line.questionIndex === lastQuestionIndex;});
      answerLine.type = "text";
      var correctAnswer = Controller.getCorrectAnswerByIndex(lastQuestionLine.questionIndex);
      var answerToSave = {correct: false};

      if(lastQuestionLine && lastQuestionLine.type === "text") {
        var answerText = lastQuestionLine.text;
        answerToSave.text = answerText;
        if(answerText.localeCompare(correctAnswer, undefined, { sensitivity: 'accent' }) === 0) {
          answerLine.text = Controller.getBonus(lastQuestionLine.questionIndex);
          answerToSave.correct = true;
        } else {
          answerLine.text = incorrectText  + correctAnswer;
        }
      } else if (lastQuestionLine && lastQuestionLine.type === "choices") {
        var choices = lastQuestionLine.choices;
        var activeChoiceIndex = 0;
        var found = choices.some((choice, index) => { activeChoiceIndex = index; return choice.active === true });
        if(found) {
          if(activeChoiceIndex === correctAnswer) {
            answerLine.text = Controller.getBonus(lastQuestionLine.questionIndex);
            answerToSave.correct = true;
          } else {
            answerLine.text = incorrectText + choices[correctAnswer].text;
          }
        }
      }
      Controller.addAnswer(answerToSave);
    }

    // Last question done, show results
    if(nextQuestion === undefined) { 
      const numberOfCorrectAnswer = Controller.getNumberOfCorrectAnswers();
      var lastLine = {type: "text", text: ""};
      if(numberOfCorrectAnswer > 5) {
        lastLine.text = `You got ${numberOfCorrectAnswer} questions correct, humanity might be saved for this time...but the machines will end up winning some day, you can go back in time now...`;
      } else {
        lastLine.text = `You got ${numberOfCorrectAnswer} questions correct, your weak human intelligence was obviously not enough for this test!, machines will prevail forever, brace yourself for complete human destruction!`;
      }
      setLines((prevLines) => {
        return [...prevLines, answerLine, lastLine];
      });
      return; 
    }

    // New questions
    var nextLine = { text: nextQuestion.text, type: "text"};
    var inputLine = {text: "", questionIndex: currentQuestionIndex, type: nextQuestion.type, answer: nextQuestion.answer};
    if(nextQuestion.type === 'choices') {
        const choices = nextQuestion.choices.map((choice) => { return {text: choice, active: false}});
        choices[0].active = true;
        inputLine.choices = choices;
    }

    setLines((prevLines) => {
      return [...prevLines, answerLine, nextLine, inputLine];
    });
  }

  // Prompt intro
  useEffect(() => {
    setTimeout(() => {
      var userLine = { text: "Press ENTER to continue", type: "prompt" };
      setLines((prevLines) => {
        return [...prevLines, userLine];
      });
      Controller.setReady();
    }, Controller.getPromptTimeout());
  }, []);

  return (
    <ul className="lines">
        {lines.map((line, index) => (
            <TerminalLine key={index} line={line} type={line.type} isCurrentLine={ line.questionIndex === Controller.getCurrentQuestionIndex()} onQuestionAnswered={onQuestionAnswered}/>
        ))}        
    </ul>
  );
}
