import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  Network,
  Brain,
  FileCheck,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Vulnerability Scans', href: '/scans', icon: Shield },
  { name: 'Alerts & Incidents', href: '/alerts', icon: AlertTriangle },
  { name: 'Network Monitoring', href: '/network', icon: Network },
  { name: 'Threat Intelligence', href: '/intel', icon: Brain },
  { name: 'Compliance', href: '/compliance', icon: FileCheck },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-500" />
          <div>
            <h1 className="text-xl font-bold">SecureOps</h1>
            <p className="text-xs text-gray-400">Security Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                'flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2024 SecureOps Platform</p>
        </div>
      </div>
    </div>
  );
}
