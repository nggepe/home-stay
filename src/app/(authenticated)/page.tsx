'use client';
import { Logout } from '@/repositories/AuthRepository';

export default function Home() {
  return (
    <div>
      <button
        onClick={async () => {
          await Logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
