import React, { useState, useEffect } from "react";
import {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const debounced = useDebounce(search);

  const { isLoading, data, isError } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: isRepoLoading, data: repos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setShowDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const handleClick = (username: string) => {
    fetchRepos(username);
    setShowDropdown(false);
  };

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[44px] mb-2"
          placeholder="Search for github username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {showDropdown && (
          <ul className="list-none absolute top-[44px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => handleClick(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {isRepoLoading && <p className="text-center">Repos are loading...</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
