'use client';

import { useEffect } from 'react';

export default function VersionLogger() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log(
        `%c Version: ${process.env.NEXT_PUBLIC_GIT_HASH?.substring(0, 7)} `,
        'background: #222; color: #bada55; padding: 4px; border-radius: 4px;',
      );
    }
  }, []);

  return null;
}
