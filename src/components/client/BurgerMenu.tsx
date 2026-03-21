"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useGroupInvites } from "@/hooks/useGroup";


type BurgerMenuProps = {
  onCreatePerson?: () => void;
  onAddFamily?: () => void;
  onCreateTree?: () => void;
  onExportSVG?: () => void;
  onExportPDF?: () => void;
};

export default function BurgerMenu({ onCreatePerson, onAddFamily, onCreateTree, onExportSVG, onExportPDF }: BurgerMenuProps) {
    const { data: session } = useSession();
    const { data: invites = [] } = useGroupInvites();

    const router = useRouter();

  return (
    <NavigationMenu viewport={false} className="list-none">
        <NavigationMenuItem>
          <NavigationMenuTrigger >
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] hover:cursor-pointer">
                {session && (
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
                      {onCreateTree && (
                        <li
                            key={'CreateTree'}
                            onClick={() => onCreateTree()}
                        >
                            إضافة شجرة عائلية
                        </li>
                      )}
                      <li
                        key={'Groups'}
                        onClick={() => router.push('/groups')}
                        className="relative"
                      >
                        المجموعات
                        {invites.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                            {invites.length}
                          </span>
                        )}
                      </li>
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
                        key={'FamilyTreeList'}
                        onClick={() => {router.push('/familyTreeList')}}
                      >
                        قائمة أشجار العائلة
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
