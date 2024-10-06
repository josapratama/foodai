import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface ProfileDialogProps {
  user: { username: string; email: string };
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({
  user,
  isProfileOpen,
  setIsProfileOpen,
}) => {
  return (
    <AlertDialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <AlertDialogContent className="max-w-[90%] md:max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Profile</AlertDialogTitle>
          <AlertDialogDescription>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end mt-4">
          {" "}
          {/* Pastikan justify-end dan jarak yang cukup */}
          <AlertDialogCancel
            onClick={() => setIsProfileOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Close
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileDialog;
