"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";


type BurgerMenuProps = {
  onCreatePerson?: () => void;
  onAddFamily?: () => void;
  onExportSVG?: () => void;
  onExportPDF?: () => void;
};

export default function BurgerMenu({ onCreatePerson, onAddFamily, onExportSVG, onExportPDF }: BurgerMenuProps) {
    const { data: session, status } = useSession();
    const isAdmin = session?.user?.role === "ADMIN";

    const router = useRouter();
    
  return (
    <NavigationMenu viewport={false} className="list-none">
        <NavigationMenuItem>
          <NavigationMenuTrigger >
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] hover:cursor-pointer">
                {session && isAdmin && (
                    <>
                      {onCreatePerson && (
                        <li
                            key={'CreatePerson'}
                            onClick={() => onCreatePerson()}
                        >
                            إضافة فرد
                        </li>
                      )}
                      {onAddFamily && (
                        <li
                            key={'AddFamily'}
                            onClick={() => onAddFamily()}
                        >
                            إضافة عائلة
                        </li>
                      )}
                      <li
                        key={'MembersList'}
                        onClick={() => {router.push('/membersList')}}
                      >
                        قائمة الأفراد
                      </li>
                      <li
                        key={'FamiliesList'}
                        onClick={() => {router.push('/familiesList')}}
                      >
                        قائمة العائلات
                      </li>
                      <li
                        key={'RelationsList'}
                        onClick={() => {router.push('/relationsList')}}
                      >
                        قائمة العلاقات الزوجية
                      </li>
                    </>
                    )
                }
                {onExportPDF && (
                <li
                  key={'ExportPDF'}
                  onClick={() => onExportPDF()}
                >
                    PDF استيراد الشجرة 
                </li>
                )}
              {session && (
                <>
                  {onExportSVG && (
                    <li
                      key={'ExportSVG'}
                      onClick={() => onExportSVG()}
                    >
                        SVG استيراد الشجرة
                    </li>
                  )}
                  <li
                  key={'Signout'}
                  onClick={() => {signOut()}}
                  >
                      تسجيل الخروج
                  </li>
                </>
              )}
              {!session && (
                <>
                  <li 
                    key={'Signin'}
                    onClick={() => {router.push(`/auth/signin`)}}
                  >
                    تسجيل الدخول
                  </li>
                </>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
    </NavigationMenu>
  )
}