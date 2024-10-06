import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Logo from "../logo";
import { Input } from "../ui/input";
import { useTranslations } from "@/hooks/use-translations"; // Import useTranslations

interface HeaderProps {
  user: { username: string; email: string };
  setIsProfileOpen: (open: boolean) => void;
  setIsSettingOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const HeaderPage: React.FC<HeaderProps> = ({
  user,
  setIsProfileOpen,
  setIsSettingOpen,
  handleLogout,
}) => {
  const { t } = useTranslations(); // Use translations

  return (
    <header className="flex items-center justify-between p-2 border-b shadow-md h-[100px]">
      <div className="flex items-center space-x-4">
        <Logo className="flex-shrink-0 mr-4" />
        <div className="hidden md:flex items-center">
          <Input
            type="text"
            placeholder={t("dashboard_page.search_placeholder")}
            className="border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none transition duration-200 h-8"
          />
          <Button size="icon" className="hover:bg-gray-500 p-1 ml-2 h-8 w-8">
            <Search className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="text-gray-700 font-medium cursor-pointer">
              {`${t("dashboard_page.welcome_message")} ${user.username}`}
              {""}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t("dashboard_page.account")}</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
              {t("dashboard_page.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsSettingOpen(true)}>
              {t("dashboard_page.settings")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              {t("dashboard_page.logout_title")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default HeaderPage;
