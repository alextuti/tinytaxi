import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (entries: Record<string, string>) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");

      Object.entries(entries).forEach(([name, value]) => {
        params.set(name, value);
      });

      return params.toString();
    },
    [searchParams]
  );

  const updateSearchParams = useCallback(
    (entries: Record<string, string>) => {
      const queryString = createQueryString(entries);

      router.push(`${pathname}?${queryString}`);
    },
    [createQueryString, pathname, router]
  );

  return updateSearchParams;
};
