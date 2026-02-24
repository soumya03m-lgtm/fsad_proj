import Card from '../ui/Card';

export default function FormPreview({ title, questions }) {
  return (
    <Card title="Live Preview" subtitle={title || 'Untitled form'}>
      <div className="space-y-2">
        {questions.map((q, index) => (
          <div key={q.questionId} className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800">
            <p>
              {index + 1}. {q.label || 'Untitled question'} ({q.type}) {q.required ? '*' : ''}
            </p>
            {q.options?.length ? <p className="mt-1 text-xs text-slate-500">Options: {q.options.join(', ')}</p> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
