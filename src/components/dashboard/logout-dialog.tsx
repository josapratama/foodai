import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "@/hooks/use-translations";

interface LogoutDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  confirmLogout: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  confirmLogout,
}) => {
  const { t } = useTranslations();

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent className="max-w-[90%] md:max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("dashboard_page.logout_title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("dashboard_page.logout_description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end space-x-4 mt-4">
          {" "}
          {/* Menambahkan space-x-4 untuk jarak tombol */}
          <AlertDialogCancel
            onClick={() => setIsDialogOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            {t("dashboard_page.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            {t("dashboard_page.logout")}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
