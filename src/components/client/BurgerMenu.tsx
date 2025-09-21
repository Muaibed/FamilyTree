"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useSession } from "next-auth/react"
import { Menu } from 'lucide-react';


type BurgerMenuProps = {
  onCreatePerson: () => void;
  onAddFamily: () => void;
  onExport: () => void;
  onSignout: () => void;
};

export default function BurgerMenu({ onCreatePerson, onAddFamily, onExport, onSignout }: BurgerMenuProps) {
    const { data: session, status } = useSession();
    const isAdmin = session?.user?.role === "ADMIN";
    
  return (
    <NavigationMenu viewport={false} className="list-none">
        <NavigationMenuItem>
          <NavigationMenuTrigger >
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] hover:cursor-pointer">
                {session && isAdmin && (
                    <>
                        <li
                            key={'CreatePerson'}
                            onClick={() => onCreatePerson()}
                        >
                            إضافة فرد
                        </li>
                        <li
                            key={'AddFamily'}
                            onClick={() => onAddFamily()}
                        >
                            إضافة عائلة
                        </li>
                    </>
                    )
                }
                <li
                  key={'Export'}
                  onClick={() => onExport()}
                >
                    Export as SVG
                </li>
                {session && (
                    <>
                        <li
                        key={'Signout'}
                        onClick={() => onSignout()}
                        >
                            تسجيل الخروج
                        </li>
                    </>
                )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
    </NavigationMenu>
  )
}