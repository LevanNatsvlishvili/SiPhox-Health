import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

const QuestionComponent = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Reset selected option and input value when the question changes
  useEffect(() => {
    setSelectedOption(null);
    setInputValue('');
  }, [question]);

  const handleOptionChange = (option) => {
    console.log(option);
    if (question.type === 'multi-choice') {
      setSelectedOption((p) => (Array.isArray(p) ? [...p, option] : [option]));
      return;
    }
    setSelectedOption(option);
  };

  console.log(selectedOption);

  const handleCheck = (question, option) => {
    if (question.type === 'one-choice') {
      return selectedOption === option.text;
    }
    return Array.isArray(selectedOption) ? selectedOption.includes(option.text) : false;
  };

  const handleSubmit = () => {
    if (question.type === 'input') {
      onAnswer(question.id, inputValue);
    } else {
      onAnswer(question.id, selectedOption);
    }
  };

  useEffect(() => {
    // Move focus to the question when it changes
    const questionElement = document.getElementById(`question-${question.id}`);
    if (questionElement) {
      questionElement.focus();
    }
  }, [question]);

  return (
    <div className="question-component">
      <h2 id={`question-${question.id}`} tabIndex="-1">
        {question.title}
      </h2>
      {question.image && <img src={question.image} alt={question.description || 'Related visual'} />}
      <p>{question.description}</p>
      <div aria-live="polite">
        <h3>{question.question}</h3>
      </div>

      {question.type === 'one-choice' || question.type === 'multi-choice' ? (
        <fieldset>
          <ul>
            {question.options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type={question.type === 'one-choice' ? 'radio' : 'checkbox'}
                    name={`question-${question.id}`}
                    value={option.text}
                    checked={handleCheck(question, option)}
                    onChange={() => handleOptionChange(option.text)}
                  />
                  {option.text}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : (
        <>
          <input
            id={`input-${question.id}`}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </>
      )}
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

QuestionComponent.propTypes = {
  question: PropTypes.object.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default QuestionComponent;
