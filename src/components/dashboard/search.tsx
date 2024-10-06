import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SearchTop = () => {
  return (
    <div className="mb-4 flex flex-row items-center space-x-2">
      <div className="flex-grow md:hidden">
        <Input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none transition duration-200"
        />
      </div>
      <Button size="icon" className="hover:bg-gray-100 md:hidden">
        <Search className="h-4 w-4 text-gray-600" />
      </Button>
    </div>
  );
};
