import Checkout from "./page";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

//if there is no user signed out, don't allow checkout
export default function ServerCheckout() {
  const { userId } = useAuth();
  if (!userId) redirect("/sign-in?redirect_url=/checkout");

  return <Checkout />;
}
