import { useState } from 'react';
import Answer from './components/Answer';
import Button from './components/Button';
import Question from './components/Question';
import QuizTitle from './components/QuizTitle';
import { QUIZ_MOCK } from './mocks/quiz-data';
import Container from './components/Container';

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const question = QUIZ_MOCK.questions[questionIndex];
  const correctAnswerId = question.correctAnswer;
  const numberOfQuestion = QUIZ_MOCK.questions.length;

  function handleSelectAnswer(answerId) {
    if (!showCorrectAnswer) {
      setSelectedAnswerId(answerId);
    }
  }

  function handleConfirm() {
    setShowCorrectAnswer(true);

    if (correctAnswerId === selectedAnswerId) {
      setCorrectAnswers((prev) => prev + 1);
    }
  }

  function handleNextQuestion() {
    setShowCorrectAnswer(false);

    if (questionIndex < numberOfQuestion - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswerId(null);
    } else {
      setQuizFinished(true);
    }
  }

  return (
    <div className='flex flex-col h-screen bg-stone-200 p-10'>
      <div className='text-center'>
        <QuizTitle>{QUIZ_MOCK.title}</QuizTitle>
      </div>

      {!quizFinished ? (
        <Container>
          <p className='text-center mb-4 text-emerald-400 font-bold'>
            {questionIndex + 1} / {numberOfQuestion}
          </p>
          <Question>{question.name}</Question>
          <ul className='flex flex-1 flex-col space-y-3 mb-8'>
            {question.answers.map((answer) => {
              // 1. Proveri da li je ovaj odgovor izabran
              const isSelected = selectedAnswerId === answer.id;

              // 2. Proveri da li je tacan
              const isCorrectAnswer = answer.id === correctAnswerId;

              // 3. Inicijalno stanje je NONE
              let state = 'NONE';

              // 3.1 Ali ukoliko zelimo da vidimo resenja
              // A odgovor je izabran ili je tacan dodeliti odgovarajuce stanje odgovoru
              if (showCorrectAnswer && (isSelected || isCorrectAnswer)) {
                state = isCorrectAnswer ? 'CORRECT' : 'WRONG';
              }

              return (
                <Answer
                  state={state}
                  disabled={showCorrectAnswer}
                  isSelected={isSelected}
                  onClick={() => handleSelectAnswer(answer.id)}
                  key={answer.id}
                >
                  {answer.value}
                </Answer>
              );
            })}
          </ul>
          {!showCorrectAnswer ? (
            <Button
              disabled={selectedAnswerId === null}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {numberOfQuestion !== questionIndex + 1
                ? 'Next Question'
                : 'Finish quiz'}
            </Button>
          )}
        </Container>
      ) : (
        <Container>
          <Question>Rezultati Kviza:</Question>
          <p className='text-center mb-4 text-emerald-400 font-bold'>
            Broj tacnih odgovora: {correctAnswers} / {numberOfQuestion}
          </p>
        </Container>
      )}
    </div>
  );
}

export default App;
