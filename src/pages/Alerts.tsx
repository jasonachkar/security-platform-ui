import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import api from '../lib/api';
import clsx from 'clsx';

interface Alert {
  id: number;
  title: string;
  severity: string;
  status: string;
  detected_at: string;
  source_service: string;
}

export default function Alerts() {
  const { data: alerts } = useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await api.get('/alerts');
      return response.data || [];
    },
    refetchInterval: 15000,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alerts & Incidents</h1>
        <p className="text-gray-500 mt-1">Manage security alerts and incident response</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Open Alerts</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{alerts?.filter(a => a.status === 'open').length || 0}</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Critical</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{alerts?.filter(a => a.severity === 'critical').length || 0}</p>
            </div>
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Resolved Today</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{alerts?.filter(a => a.status === 'resolved').length || 0}</p>
            </div>
            <Info className="h-12 w-12 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {alerts?.slice(0, 10).map((alert) => (
            <div key={alert.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <SeverityBadge severity={alert.severity} />
                    <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Source: {alert.source_service}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(alert.detected_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={clsx('px-2 py-1 rounded text-xs font-medium', colors[severity as keyof typeof colors] || colors.low)}>
      {severity.toUpperCase()}
    </span>
  );
}
