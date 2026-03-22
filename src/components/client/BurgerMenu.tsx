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
import {
  UserPlus,
  FolderPlus,
  GitBranchPlus,
  Users,
  List,
  BookOpen,
  GitMerge,
  Heart,
  FileImage,
  FileText,
  LogOut,
  LogIn,
} from "lucide-react";

type BurgerMenuProps = {
  onCreatePerson?: () => void;
  onAddFamily?: () => void;
  onCreateTree?: () => void;
  onExportSVG?: () => void;
  onExportPDF?: () => void;
};

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 pb-1 pt-0.5">{title}</p>
      {children}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  badge,
  danger,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  badge?: number;
  danger?: boolean;
}) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors text-sm font-medium relative
        ${danger
          ? "text-destructive hover:bg-destructive/10"
          : "text-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {badge}
        </span>
      )}
    </li>
  );
}

export default function BurgerMenu({ onCreatePerson, onAddFamily, onCreateTree, onExportSVG, onExportPDF }: BurgerMenuProps) {
  const { data: session } = useSession();
  const { data: invites = [] } = useGroupInvites();
  const router = useRouter();

  const hasActions = onCreatePerson || onAddFamily || onCreateTree;
  const hasExports = onExportSVG || onExportPDF;

  return (
    <NavigationMenu viewport={false} className="list-none">
      <NavigationMenuItem>
        <NavigationMenuTrigger />
        <NavigationMenuContent>
          <ul
            dir="rtl"
            className="flex flex-col gap-3 w-[260px] p-3"
          >
            {session && hasActions && (
              <MenuSection title="إجراءات">
                {onCreatePerson && (
                  <MenuItem icon={UserPlus} label="إضافة فرد" onClick={onCreatePerson} />
                )}
                {onAddFamily && (
                  <MenuItem icon={FolderPlus} label="إضافة عائلة" onClick={onAddFamily} />
                )}
                {onCreateTree && (
                  <MenuItem icon={GitBranchPlus} label="إضافة شجرة عائلية" onClick={onCreateTree} />
                )}
              </MenuSection>
            )}

            {session && (
              <>
                {(hasActions) && <hr className="border-border" />}
                <MenuSection title="تصفح">
                  <MenuItem icon={List} label="قائمة الأفراد" onClick={() => router.push('/membersList')} />
                  <MenuItem icon={BookOpen} label="قائمة العائلات" onClick={() => router.push('/familiesList')} />
                  <MenuItem icon={GitMerge} label="قائمة أشجار العائلة" onClick={() => router.push('/familyTreeList')} />
                  <MenuItem icon={Heart} label="قائمة العلاقات الزوجية" onClick={() => router.push('/relationsList')} />
                  <MenuItem icon={Users} label="المجموعات" onClick={() => router.push('/groups')} badge={invites.length} />
                </MenuSection>
              </>
            )}

            {session && hasExports && (
              <>
                <hr className="border-border" />
                <MenuSection title="تصدير">
                  {onExportPDF && (
                    <MenuItem icon={FileText} label="تصدير PDF" onClick={onExportPDF} />
                  )}
                  {onExportSVG && (
                    <MenuItem icon={FileImage} label="تصدير SVG" onClick={onExportSVG} />
                  )}
                </MenuSection>
              </>
            )}

            <hr className="border-border" />

            {session ? (
              <MenuItem icon={LogOut} label="تسجيل الخروج" onClick={() => signOut()} danger />
            ) : (
              <MenuItem icon={LogIn} label="تسجيل الدخول" onClick={() => router.push('/auth/signin')} />
            )}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
