import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mb-4 text-slate-500">Page not found.</p>
        <Link to="/" className="text-brand-600">Go home</Link>
      </div>
    </div>
  );
}
