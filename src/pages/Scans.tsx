import { useQuery } from '@tanstack/react-query';
import { Shield, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import api from '../lib/api';
import clsx from 'clsx';

interface Scan {
  id: number;
  target_url: string;
  status: string;
  created_at: string;
  findings_count?: number;
  risk_summary?: Record<string, number>;
}

export default function Scans() {
  const { data: scans, isLoading } = useQuery<Scan[]>({
    queryKey: ['scans'],
    queryFn: async () => {
      const response = await api.get('/scans');
      return response.data.scans || [];
    },
    refetchInterval: 10000, // Refresh every 10s
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vulnerability Scans</h1>
          <p className="text-gray-500 mt-1">Web application security scanning</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          New Scan
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading scans...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scans?.map((scan) => (
                  <tr key={scan.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{scan.target_url}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={scan.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{scan.findings_count || 0}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(scan.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    queued: { icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    running: { icon: AlertTriangle, color: 'bg-blue-100 text-blue-800' },
    completed: { icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    failed: { icon: XCircle, color: 'bg-red-100 text-red-800' },
  };

  const { icon: Icon, color } = config[status as keyof typeof config] || config.queued;

  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', color)}>
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </span>
  );
}
