import { useQuery } from "react-query";

export function useUserData(userId) {
  async function getUserById() {
    const res = await fetch(`/api/users/${userId}`);
    return await res.json();
  }

  return useQuery({
    queryKey: ["users", userId],
    queryFn: getUserById,
    enabled: !!userId,
  });
}
