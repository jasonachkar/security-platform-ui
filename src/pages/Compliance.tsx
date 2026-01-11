import { FileCheck, CheckCircle, XCircle } from 'lucide-react';

export default function Compliance() {
  const frameworks = [
    { name: 'NIST 800-53', coverage: 78, status: 'partial' },
    { name: 'PCI-DSS 4.0', coverage: 92, status: 'compliant' },
    { name: 'CIS Controls', coverage: 65, status: 'partial' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance</h1>
          <p className="text-gray-500 mt-1">Framework mapping and compliance reporting</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {frameworks.map((framework) => (
          <div key={framework.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{framework.name}</h3>
              {framework.status === 'compliant' ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-yellow-500" />
              )}
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Coverage</span>
                <span className="font-medium text-gray-900">{framework.coverage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${framework.coverage}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {framework.status === 'compliant' ? 'Fully compliant' : 'Partially compliant'}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Control Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Compliant Controls</span>
              <span className="text-2xl font-bold text-green-600">245</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Non-Compliant Controls</span>
              <span className="text-2xl font-bold text-red-600">47</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
