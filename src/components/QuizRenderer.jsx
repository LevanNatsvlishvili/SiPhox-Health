import { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import ProgressBar from './ProgressBar';
import { PropTypes } from 'prop-types';

const QuizContainer = ({ quiz }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState({});

  const currentQuestion = quiz.questions.find((q) => q.id === currentQuestionId);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    // Conditional navigation based on the user's answer
    let nextQuestionId;

    if (currentQuestion.type === 'one-choice') {
      const selectedOption = currentQuestion.options.find((option) => option.text === answer);
      nextQuestionId = selectedOption?.nextQuestionId;
    } else if (currentQuestion.type === 'multi-choice') {
      const selectedOption = currentQuestion.options.find((option) => option.text === answer[0]);
      nextQuestionId = selectedOption?.nextQuestionId;
    } else if (currentQuestion.type === 'input') {
      nextQuestionId = currentQuestion.nextQuestionId;
    }
    if (nextQuestionId) {
      console.log(nextQuestionId);
      setCurrentQuestionId(nextQuestionId);
    } else {
      // Handle quiz completion or ending the quiz
      alert('Quiz Completed!');
    }
  };

  console.log(answers);

  return (
    <div className="quiz-container">
      <h1>{quiz.title}</h1>
      <ProgressBar current={currentQuestionId} total={quiz.questions.length} />
      <QuestionComponent question={currentQuestion} onAnswer={handleAnswer} />
    </div>
  );
};

QuizContainer.propTypes = {
  quiz: PropTypes.object.isRequired,
};

export default QuizContainer;
