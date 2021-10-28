import React from "react";

import AppRouter from "./router";
import { AuthContext } from "./shared/context/auth-context";
import { SearchContext } from "./shared/context/search-context";
import { ProfileContext } from "./shared/context/profile-context";
import { useSearch } from "./shared/hooks/search-hook";
import { useProfile } from "./shared/hooks/profile-hook";
import { useAuth } from "./shared/hooks/auth-hook";
import "./App.css";

function App() {
  const auth = useAuth();
  const search = useSearch();
  const profile = useProfile();

  return (
    <AuthContext.Provider value={auth}>
      <ProfileContext.Provider value={profile}>
        <SearchContext.Provider value={search}>
          <div className="App">
            <AppRouter />
          </div>
        </SearchContext.Provider>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
