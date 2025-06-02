'use server';

import getAuth from "@/functions/get-auth";
import { redirect, RedirectType } from "next/navigation";

export default async function page() {

  const auth = await getAuth();
  if (auth) redirect("/home", RedirectType.replace);
  else redirect("/authentication", RedirectType.replace)

  return (
    <div className="size-full grid place-content-center">
      <i className="opacity-50"> Redirecting you ... </i>
    </div>
  );
}