"use client";
import { useState, useCallback } from "react";
import Avatar from "../Avatar";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={() => toggleOpen()}
          className="flex p-2 border-[1px] border-slate-400 items-center gap-1 rounded-full cursor-pointer hover:shadow-md text-slate-700 transition"
        >
          <Avatar src={currentUser?.image} />
          {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={() => toggleOpen()}>Your Orders</MenuItem>
                </Link>
                <Link href="/admin">
                  <MenuItem onClick={() => toggleOpen()}>
                    Admin Dashboard
                  </MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={() => toggleOpen()}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={() => toggleOpen()}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={() => toggleOpen()} /> : null}
    </>
  );
};

export default UserMenu;