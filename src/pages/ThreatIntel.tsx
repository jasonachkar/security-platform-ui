import { Brain, Database, Shield } from 'lucide-react';

export default function ThreatIntel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Threat Intelligence</h1>
        <p className="text-gray-500 mt-1">CVE tracking, MITRE ATT&CK mapping, and IOC monitoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">CVEs Tracked</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">342</p>
            </div>
            <Database className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">MITRE Techniques</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">156</p>
            </div>
            <Brain className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">IOCs</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">89</p>
            </div>
            <Shield className="h-12 w-12 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent CVEs</h3>
        <div className="space-y-3">
          {['CVE-2024-1234', 'CVE-2024-5678', 'CVE-2024-9012'].map((cve) => (
            <div key={cve} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{cve}</p>
                <p className="text-sm text-gray-500">Critical SQL Injection vulnerability</p>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                CRITICAL
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
