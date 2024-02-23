import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/components/wisernote-removebg.png";
import { User } from "@workos-inc/node";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, Link } from "@remix-run/react";

export default function NavBar({ currentUser }: { currentUser?: User }) {
  if (currentUser?.firstName && currentUser?.lastName) {
    const userInitials =
      currentUser.firstName.charAt(0) + currentUser.lastName.charAt(0);
    console.log(userInitials);
    return (
      <div className="flex bg-gradient-to-r from-blue-100 to-[#0074B7] h-20 items-center justify-between shadow-lg">
        <div className="ml-10">
          <img
            src={logo}
            alt="Logo"
            className="w-auto h-12 items-center mr-2"
          />
        </div>

        <div className="flex items-center gap-6">
          <div>
            
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="mr-10">
                    <Avatar className="bg-blackA1 inline-flex h-[54px] w-[54px] text-white uppercase select-none items-center justify-center overflow-hidden rounded-full align-middle border-2 bg-transparent font-semibold font-sans">
                      <AvatarFallback style={{textTransform: "uppercase"}}>{userInitials}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 bg-[#0074B7] border rounded text-center">
                  <DropdownMenuLabel className="font-sans font-semibold">
                  <Form method="POST">
                  <button name="_action" value="logout" type="submit" className="uppercase text-white">
                      {" "}
                      Log out{" "}
                    </button>
                    </Form>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem className="font-sans font-semibold">
                    Test
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gradient-to-r from-blue-100 to-[#0074B7] h-20 items-center justify-between shadow-lg">
      <div className="ml-10">
        <img
          src={logo}
          alt="Logo"
          className="w-auto h-12 items-center mr-2"
        />
      </div>

      <div className="flex items-center gap-6 mr-10">
      
          <div className="">
            <Link to="/login" className="text-white">
              Log in or
            </Link>
          </div>

          <div className="">
            <Link to="/register">
            <button className="bg-transparent text-white hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" > Get Started </button>
            </Link>
          </div>

        </div>

    </div>
  )
}
