'use server';

import getAuth from "@/functions/get-auth";
import { redirect, RedirectType } from "next/navigation";

export async function GET() {
  const auth = await getAuth();
  if (auth) redirect("/home", RedirectType.replace);
  else redirect("/authentication", RedirectType.replace)
}