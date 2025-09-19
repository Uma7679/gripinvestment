import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get("/investors/me").then(res => setProfile(res.data)).catch(console.error);
    }, []);

    if (!profile) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
                <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Risk Appetite:</strong> {profile.riskAppetite}</p>
            </div>
        </div>
    );
}
