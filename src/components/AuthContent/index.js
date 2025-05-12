import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import PropTypes from "prop-types";

/**
 * Renders `children` only when the user is signed in.
 * Otherwise renders `fallback` (or null if you don’t pass one).
 */
export default function AuthContent({ children, fallback = null }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    // get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    // subscribe to changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
    return () => subscription?.unsubscribe();
  }, []);

  // still checking?
  if (session === undefined) return null;

  // show fallback if not signed in
  if (!session) return fallback;

  // signed in → show protected children
  return children;
}

AuthContent.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};
