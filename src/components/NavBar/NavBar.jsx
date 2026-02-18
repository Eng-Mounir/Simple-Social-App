import {
  Navbar ,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import nextifylogo from "../../assets/images/nextifyLogo2.png";
import { FiSearch} from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import userIcon from "../../assets/images/userIcon.png"
import {Badge} from "@heroui/react";
import { LuMessageCircleMore } from "react-icons/lu";
export default function App() {
  return (
        <Navbar isBordered>
        <NavbarBrand className="mr-4">
          <img src={nextifylogo} alt="Nextify Logo" className="w-16" />
          <p className="hidden sm:block font-bold text-inherit">Nextify</p>
        </NavbarBrand>

        <NavbarBrand className=" max-w-2xl">
          <Input
          classNames={{
            radius: "full",
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<FiSearch />}
          type="search"
        />
        </NavbarBrand>


        <NavbarContent as="div" className="items-center" justify="end">

        <NavbarBrand className="rounded-full bg-gray-100 p-3 grow-0">
          <Badge color="danger" content="5">
          <IoIosNotifications className="text-2xl" />
          </Badge>

        </NavbarBrand>
        <NavbarBrand className="rounded-full bg-gray-100 p-3 grow-0">
          <Badge color="danger" content="2">
          <LuMessageCircleMore className="text-2xl" />
          </Badge>
        </NavbarBrand>
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="cursor-pointer">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={userIcon}
              
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Profile</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/auth/login"; // Redirect to login page after logout
            }}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </NavbarContent>
    </Navbar>
  );
}
