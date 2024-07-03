'use client';

import { useState } from 'react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function TanstackQueryProviders({
  children,
}: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
