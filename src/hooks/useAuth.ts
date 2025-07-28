import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/authApi";


export default function useAuth() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    retry: 3,
    refetchOnWindowFocus: false
  })
  
 
  return {data, isLoading, isError}
}
