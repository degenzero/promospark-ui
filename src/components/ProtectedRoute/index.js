// src/components/ProtectedRoute/index.js
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

/**
 * A wrapper for routes that require an authenticated user.
 * If no valid Supabase session exists, it redirects to sign-in.
 */
export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    // Optionally render a loader here
    return null;
  }

  // If no user, redirect to sign-in
  if (!session) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  // Authenticated, render child routes
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
