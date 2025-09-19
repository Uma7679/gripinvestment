import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useFetch(url, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        api.get(url)
            .then((res) => { if (mounted) { setData(res.data); setError(null); } })
            .catch((err) => { if (mounted) setError(err.response?.data || "Error"); })
            .finally(() => { if (mounted) setLoading(false); });

        return () => { mounted = false; };
    }, deps);

    return { data, loading, error };
}
