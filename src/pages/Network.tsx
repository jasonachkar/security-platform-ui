import { Activity, Wifi, AlertTriangle } from 'lucide-react';

export default function Network() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Network Monitoring</h1>
        <p className="text-gray-500 mt-1">Real-time network traffic analysis and anomaly detection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Flows</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">1,247</p>
            </div>
            <Activity className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Connections</p>
              <p className="text-3xl font-bold text-green-600 mt-1">89</p>
            </div>
            <Wifi className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Anomalies</p>
              <p className="text-3xl font-bold text-red-600 mt-1">3</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Traffic Overview</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>Network flow visualization will appear here</p>
        </div>
      </div>
    </div>
  );
}
