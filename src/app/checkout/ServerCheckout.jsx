import Checkout from "./page";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

//if there is no user signed out, don't allow checkout
export default function ServerCheckout() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in?redirect_url=/checkout");

  return <Checkout />;
}
