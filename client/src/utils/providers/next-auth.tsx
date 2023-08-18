'use client';
import { LayoutRootProps } from '@/interface';
import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider = (props: LayoutRootProps) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
