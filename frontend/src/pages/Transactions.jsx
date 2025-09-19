import React, { useEffect, useState } from "react";
import { getLogs } from "../api/logService";

export default function Transactions() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        getLogs().then(setLogs).catch(console.error);
    }, []);

    return (
        <div className="p-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Transaction Logs</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Endpoint</th>
                            <th className="px-6 py-3">Method</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Timestamp</th>
                            <th className="px-6 py-3">Error</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.map(log => (
                            <tr key={log.id} className="bg-white border-b">
                                <td className="px-6 py-4 font-mono">{log.endpoint}</td>
                                <td className="px-6 py-4">{log.http_method || log.http_method}</td>
                                <td className={`px-6 py-4 font-semibold ${log.statusCode >= 400 ? 'text-red-500' : 'text-green-500'}`}>{log.statusCode || log.status_code}</td>
                                <td className="px-6 py-4">{new Date(log.created_at || log.created_at).toLocaleString()}</td>
                                <td className="px-6 py-4 text-red-600">{log.error_message || log.error_message || 'None'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
