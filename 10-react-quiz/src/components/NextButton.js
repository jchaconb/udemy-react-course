import { useQuiz } from '../contexts/QuizContext';

function NextButton() {
  const { index, answer, dispatch, numQuestions } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <div
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </div>
    );

  if (index === numQuestions - 1)
    return (
      <div className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
        Finish
      </div>
    );
}

export default NextButton;
