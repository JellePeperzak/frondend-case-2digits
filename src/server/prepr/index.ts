import type { DocumentNode } from 'graphql';
import { analyzeDocument } from 'graphql-request';
import type { FetchOptions } from 'ofetch';

import { gqlClient } from './client';
import { getSdk } from './generated/getSdk';

export const PreprSdk = getSdk(
  async <TData>(document: DocumentNode, variables?: unknown, options?: FetchOptions<'json'>) => {
    const { expression, operationName } = analyzeDocument(document);

    const { data } = await gqlClient<{ data: TData }>('', {
      ...options,
      body: { query: expression, variables, operationName },
    });

    return data;
  },
);
