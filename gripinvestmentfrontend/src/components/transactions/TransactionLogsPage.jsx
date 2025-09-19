import {SparklesIcon} from "../shared/Icons.jsx";

export const TransactionLogsPage = ({ logs }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Logs</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Endpoint</th>
                        <th scope="col" className="px-6 py-3">Method</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Timestamp</th>
                        <th scope="col" className="px-6 py-3">Error</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map(log => (
                        <tr key={log.id} className="bg-white border-b">
                            <td className="px-6 py-4 font-mono">{log.endpoint}</td>
                            <td className="px-6 py-4">{log.httpMethod}</td>
                            <td className={`px-6 py-4 font-semibold ${log.statusCode >= 400 ? 'text-red-500' : 'text-green-500'}`}>{log.statusCode}</td>
                            <td className="px-6 py-4">{new Date(log.createdAt).toLocaleString()}</td>
                            <td className="px-6 py-4 text-red-600">{log.errorMessage || 'None'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 bg-red-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-red-800 flex items-center"><SparklesIcon className="h-4 w-4 mr-2"/>AI Error Summary</h4>
                <p className="text-sm text-gray-700 mt-1">We noticed some failed API calls. Please review for any unexpected activity.</p>
            </div>
        </div>
    );
};