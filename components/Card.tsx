//Card.tsx
import React from 'react';

type CardProps = {
  title: string;
  value: string;
};

export const Card = ({ title, value }: CardProps) => (
  <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md w-full max-w-sm">
    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">{title}</h2>
    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{value}</p>
  </div>
);
