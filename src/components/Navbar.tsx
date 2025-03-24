"use client"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu';
import { Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {

  return (
    <NavigationMenu className="bg-marine text-amande p-8">
      <NavigationMenuList className="flex gap-8 items-center">

        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <Link href={"/"} className='flex items-center space-x-2'>
              <Package className='text-mangue' size={32} />
              <span className='text-mangue'>StockFlow</span>
            </Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem className='flex items-center flex-col'>
          <NavigationMenuTrigger>
            <Link href={"/companies"}>Entreprises</Link>
          </NavigationMenuTrigger>
          {/* <NavigationMenuContent>
            <NavigationMenuLink>Test</NavigationMenuLink>
          </NavigationMenuContent> */}
        </NavigationMenuItem>
        {/* <div className='flex ml-auto'> 
          <Link href={"/dashboard"}>
            <CircleUserRound size={32} className='text-mangue' />
          </Link>
        </div> */}
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
                <Link href={"/register"}>
                  Inscription
                </Link>
              </Button>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export default Navbar