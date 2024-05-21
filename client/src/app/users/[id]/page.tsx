"use client";

import { UsersDetail } from "../_components/users-details";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  return <UsersDetail params={params} />;
}
