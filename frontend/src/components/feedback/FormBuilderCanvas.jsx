import QuestionEditor from './QuestionEditor';
import Button from '../ui/Button';

export default function FormBuilderCanvas({ questions, setQuestions }) {
  const addQuestion = () => {
    setQuestions((prev) => [...prev, { questionId: crypto.randomUUID(), label: '', type: 'TEXT', options: [] }]);
  };

  const updateQuestion = (index, payload) => {
    setQuestions((prev) => prev.map((item, i) => (i === index ? payload : item)));
  };

  return (
    <div className="space-y-3">
      {questions.map((question, index) => (
        <QuestionEditor
          key={question.questionId}
          question={question}
          onChange={(payload) => updateQuestion(index, payload)}
          onDelete={() => setQuestions((prev) => prev.filter((_, i) => i !== index))}
        />
      ))}
      <Button onClick={addQuestion} type="button">
        Add Question
      </Button>
    </div>
  );
}
