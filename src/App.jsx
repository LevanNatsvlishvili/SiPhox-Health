import { useState, useEffect } from 'react';
import './App.scss';
import QuizContainer from './components/QuizRenderer';

function App() {
  const [quizData, setQuizData] = useState(null);
  useEffect(() => {
    fetch('/quizes/quiz-1.json')
      .then((response) => response.json())
      .then((data) => setQuizData(data.quiz))
      .catch((error) => console.error('Error loading quiz data:', error));
  }, []);

  return <div className="App">{quizData ? <QuizContainer quiz={quizData} /> : <p>Loading quiz...</p>}</div>;
}

export default App;
