import api from "@/client/api";
import { Paste } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function useUserPastes() {
  const [pastes, setPastes] = useState<Paste[]>([]);

  const session = useSession();

  const username = session?.data?.user.username;

  useEffect(() => {
    async function getUserPastes() {
      if (!username) return;

      const { result } = await api.getUserPastes.action({ username });
      setPastes(result || []);
    }

    getUserPastes();
  }, [username]);

  return pastes;
}

export default useUserPastes;
