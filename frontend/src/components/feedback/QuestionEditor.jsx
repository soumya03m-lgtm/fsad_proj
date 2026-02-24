import Input from '../ui/Input';
import Select from '../ui/Select';

export default function QuestionEditor({ question, onChange, onDelete }) {
  const supportsOptions = ['MCQ', 'LIKERT'].includes(question.type);

  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
      <Input
        placeholder="Question label"
        value={question.label}
        onChange={(e) => onChange({ ...question, label: e.target.value })}
      />
      <Select value={question.type} onChange={(e) => onChange({ ...question, type: e.target.value })}>
        <option value="MCQ">MCQ</option>
        <option value="RATING">Rating</option>
        <option value="TEXT">Text</option>
        <option value="EMOJI">Emoji</option>
        <option value="LIKERT">Likert</option>
      </Select>
      {supportsOptions && (
        <Input
          placeholder="Options (comma separated)"
          value={question.options?.join(', ') || ''}
          onChange={(e) =>
            onChange({
              ...question,
              options: e.target.value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
            })
          }
        />
      )}
      <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
        <input
          type="checkbox"
          checked={question.required || false}
          onChange={(e) => onChange({ ...question, required: e.target.checked })}
        />
        Required question
      </label>
      <button type="button" className="text-xs text-rose-600" onClick={onDelete}>
        Remove question
      </button>
    </div>
  );
}
