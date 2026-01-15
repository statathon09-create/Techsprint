import Link from 'next/link';
import { Siren, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
          <Siren className="h-6 w-6 text-primary" />
          <span>ResponseConnect</span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile" aria-label="My Profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
