// src/hooks/useDashboard.ts
import { useCallback, useEffect, useState } from "react";
import type { DashboardData } from "../dashboard";
import { fetchDashboardData } from "../services/mockDashboardService";

/**
 * Hook: useDashboard
 * - Fetches dashboard data (currently mock)
 * - Exposes loading / error / data / refresh
 */
export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetchDashboardData();
      setData(resp);
    } catch (e) {
      console.error("Failed to load dashboard data", e);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    data,
    loading,
    error,
    refresh: load,
  } as const;
};
