import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr"
import { User__MeContract } from "modules/user/me"

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {

  const { data, mutate: mutateUser } = useSWR(
    User__MeContract.contract.path,
    User__MeContract.fetcher
  );
  const user = data?.data
  useEffect(() => {
  //   // if no redirect needed, just return (example: already on /dashboard)
  //   // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
  //     // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
  //     // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user: user?.user, mutateUser, isLoggedIn: user?.isLoggedIn };
}