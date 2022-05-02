var Model = {
    lines: [{ text: "Welcome human, the test has begun, let the machine gods decide your destiny, good luck..." }],
    questions: [
        { text: "When was the Great Pyramid of Giza build?", choices: ["10th century BC", "26th century BC", "60th century BC"], answer: 1, bonus: "Thats right, it is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact" },
        { text: "What was the name of the explorer who first achieved a complete circumnavigation of the world?", answer: "Magellan" , bonus: "Excellent!, actually Magellan died in the Philippines after being struck by a bamboo spear"},
        { text: "Who was considered the king of Rock and Roll?", answer: "Elvis Prestely", bonus: "Indeed, apart from his great voice, he played the guitar, the bass and the piano!"},
        { text: "What area of a pentagon of 8 length sides?", answer: 110, bonus: "In fact in order to calculate the area it is necessary to calculate the apothem line first."},
        { text: "Who was the famous Francisco de Goya?", choices: ["A painter", "A musician", "An architect"], answer: 0, bonus: "Great!, Goya is often referred to as the last of the Old Masters and the first of the moderns."},
        { text: "0, 1, 1, 2, 3, 5, 8, 13...?", answer: 21, bonus: "Amazing, The Fibonacci numbers were first described in Indian mathematics as early as 200 BC in work by Pingala "},
        { text: "In wich movie did Arnold Schwarzenegger portrayed a robot from the future that comes to the past to help humans?", answer: "Terminator", bonus: "The hostile artificial intellegence that was threatening mankind was called Skynet"},
        { text: "What is the approximate value of the constant e (Euler's number)", answer: 2.718, bonus: " It is the limit of (1 + 1/n)n as n approaches infinity, an expression that arises in the study of compound interest."},
        { text: "What was the most popular online game during the 21st century?", choices: ["Dota2", "Albion Online", "League of Legends"], answer: 2, bonus: "That is correct, with more than 180 million players monthly LoL was the most played game during that time."},
        { text: "How many strings did a Spanish guitar have?", answer: 6, bonus: "Indeed, some variations included up to 7 or 8 strings but 99% of the instruments had only 6."}
    ],
    getCorrectAnswer: (question) => {
        if (question.choices) { return question.choices[question.answer]; }
        else { return question.answer; }
    },
    userAnswers: [],
    addLine: function(line){
        Model.lines.push(line)
    },
    addAnswer: function(answer) {
        Model.userAnswers.push(answer);
    }   
}

export {Model};