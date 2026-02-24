import { Star } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import LikertScaleInput from './LikertScaleInput';
import EmojiRatingInput from './EmojiRatingInput';

function StarRatingInput({ value, onChange }) {
  const current = Number(value || 0);

  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className={`inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm transition ${
            current >= rating
              ? 'border-[var(--brand-500)] bg-[color-mix(in_oklab,var(--brand-500)_15%,transparent)] text-[var(--brand-700)] dark:text-[var(--brand-300)]'
              : 'border-[var(--line-soft)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:border-[var(--brand-300)]'
          }`}
        >
          <Star className="h-4 w-4" fill={current >= rating ? 'currentColor' : 'none'} />
          {rating}
        </button>
      ))}
    </div>
  );
}

export default function QuestionRenderer({ question, value, onChange }) {
  switch (question.type) {
    case 'TEXT':
      return <Textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={4} />;
    case 'MCQ':
      return (
        <Select value={value || ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choose an option</option>
          {question.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      );
    case 'RATING':
      return <StarRatingInput value={value} onChange={onChange} />;
    case 'EMOJI':
      return <EmojiRatingInput value={value} onChange={onChange} />;
    case 'LIKERT':
      return <LikertScaleInput options={question.options || []} value={value} onChange={onChange} />;
    default:
      return <Input value={value || ''} onChange={(e) => onChange(e.target.value)} />;
  }
}
