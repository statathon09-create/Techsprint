'use client';

import { Button } from '@/components/ui/button';

type SOSButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

export default function SOSButton({ onClick, disabled }: SOSButtonProps) {
  return (
    <div className="relative flex items-center justify-center">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="relative h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50"
      >
        <span className="relative z-10 font-headline text-4xl sm:text-5xl font-bold tracking-widest">
          SOS
        </span>
      </Button>
      {!disabled && (
        <div className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-primary animate-pulse-red" />
      )}
    </div>
  );
}
