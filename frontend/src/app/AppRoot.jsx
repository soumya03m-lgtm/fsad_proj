import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import AppProviders from './providers/AppProviders';
import AppErrorBoundary from './providers/AppErrorBoundary';
import AppBootLoader from '../components/system/AppBootLoader';

export default function AppRoot() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <AppProviders>
          <Suspense fallback={<AppBootLoader />}>
            <AppRouter />
          </Suspense>
        </AppProviders>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
