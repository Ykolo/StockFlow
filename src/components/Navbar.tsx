"use client"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu';
import { CircleUserRound, Package } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
  const { data: session, status } = useSession();
  
  return (
    <NavigationMenu className="bg-marine text-amande p-8">
      <NavigationMenuList className="flex gap-8">

        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <Link href={"/"} className='flex items-center space-x-2'>
              <Package className='text-mangue' size={32} />
              <span className='text-mangue'>StockFlow</span>
            </Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            oui
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Test</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {status !== "loading" && (session ? (
        <div className='flex ml-auto'> 
          <Link href={"/dashboard"}>
            <CircleUserRound size={32} className='text-mangue' />
          </Link>
        </div>
        ) : (
        <div className='flex gap-4 ml-auto'>
          <NavigationMenuItem>
            <NavigationMenuTrigger asChild>
              <Button variant={'outline'} className='text-marine' asChild>
                <Link href={"/login"}>
                  Connexion
                </Link>
              </Button>
            </NavigationMenuTrigger>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger asChild>
              <Button className='bg-mangue hover:bg-mangue-hover text-marine' asChild>
                <Link href={"/signup"}>
                  Inscription
                </Link>
              </Button>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </div>)
      )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export default Navbar