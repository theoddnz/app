import { getAppSession } from "@/lib/admin-auth";
import { NavbarClient } from "@/components/NavbarClient";

export default async function Navbar() {
  const session = await getAppSession();

  return <NavbarClient session={session} />;
}
