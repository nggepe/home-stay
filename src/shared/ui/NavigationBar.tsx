'use client';
import css from './NavigationBar.module.css';
import Image from 'next/image';
import { Avatar, Button, DropdownMenu } from '@radix-ui/themes';
import { Logout } from '@/repositories/AuthRepository';
import { useRouter } from 'next/navigation';

export const NavigationBar = () => {
  const router = useRouter();
  const logout = async () => {
    await Logout();
    router.replace('/login');
  };

  return (
    <>
      <div className={css.mainNavigation}>
        <div className="mx-auto flex justify-between h-full py-0 my-0 px-7">
          <div className="flex items-center h-full gap-6">
            <Image
              priority={false}
              src="/android-chrome-192x192.png"
              alt="logo"
              width={192}
              height={192}
              className="w-10 h-10"
            />
          </div>
          <div className="flex items-center h-full">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="cursor-pointer">
                <Button variant="ghost" radius="full" className="p-0" style={{ padding: 0 }}>
                  <Avatar radius="full" fallback={'A'} />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item onClick={logout}>Logout</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
      <div className={css.mainNavigationBackground}></div>
    </>
  );
};
