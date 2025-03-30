import { useEffect } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';

import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';
import Footer from './components/Footer';

import quizData from './questions.json';
import { useQuiz } from './contexts/QuizContext';

// const API_QUESTIONS_URL = 'http://localhost:8000/questions';

export default function App() {
  const { status, dispatch } = useQuiz();

  useEffect(function () {
    dispatch({ type: 'dataReceived', payload: quizData.questions });
    // fetch(API_QUESTIONS_URL)
    //   .then(res => res.json())
    //   .then(data => dispatch({ type: 'dataReceived', payload: data }))
    //   .catch(err => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}
