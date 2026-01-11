import { useQuery } from '@tanstack/react-query';
import { Shield, AlertTriangle, Activity, FileCheck, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../lib/api';

interface DashboardStats {
  scans: {
    total: number;
    active: number;
    completed_today: number;
    critical_findings: number;
  };
  alerts: {
    total: number;
    open: number;
    critical: number;
    by_severity: Record<string, number>;
  };
  network: {
    total_flows: number;
    anomalies: number;
  };
  compliance: {
    coverage_percentage: number;
  };
}

const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6'];

export default function Dashboard() {
  // Fetch dashboard stats
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [scans, alerts, network, compliance] = await Promise.all([
        api.get('/scans/stats').then(r => r.data),
        api.get('/alerts/stats/summary').then(r => r.data),
        api.get('/network/stats').then(r => r.data),
        api.get('/compliance/coverage').then(r => r.data),
      ]);
      return { scans, alerts, network, compliance };
    },
    refetchInterval: 30000, // Refresh every 30s
  });

  // Sample trend data (in production, this would come from API)
  const trendData = [
    { date: 'Mon', vulnerabilities: 45, alerts: 23 },
    { date: 'Tue', vulnerabilities: 52, alerts: 31 },
    { date: 'Wed', vulnerabilities: 38, alerts: 18 },
    { date: 'Thu', vulnerabilities: 61, alerts: 42 },
    { date: 'Fri', vulnerabilities: 48, alerts: 27 },
    { date: 'Sat', vulnerabilities: 33, alerts: 15 },
    { date: 'Sun', vulnerabilities: 29, alerts: 12 },
  ];

  const severityData = stats?.alerts.by_severity ? [
    { name: 'Critical', value: stats.alerts.by_severity.critical || 0, color: '#ef4444' },
    { name: 'High', value: stats.alerts.by_severity.high || 0, color: '#f97316' },
    { name: 'Medium', value: stats.alerts.by_severity.medium || 0, color: '#eab308' },
    { name: 'Low', value: stats.alerts.by_severity.low || 0, color: '#3b82f6' },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time overview of your security posture</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Scans"
          value={stats?.scans.active || 0}
          icon={<Shield className="h-6 w-6" />}
          color="blue"
          trend={stats?.scans.completed_today}
          trendLabel="completed today"
        />
        <MetricCard
          title="Critical Alerts"
          value={stats?.alerts.critical || 0}
          icon={<AlertTriangle className="h-6 w-6" />}
          color="red"
          trend={stats?.alerts.open}
          trendLabel="total open"
        />
        <MetricCard
          title="Network Flows"
          value={stats?.network.total_flows || 0}
          icon={<Activity className="h-6 w-6" />}
          color="green"
          trend={stats?.network.anomalies}
          trendLabel="anomalies"
        />
        <MetricCard
          title="Compliance"
          value={`${stats?.compliance.coverage_percentage || 0}%`}
          icon={<FileCheck className="h-6 w-6" />}
          color="purple"
          trend={stats?.compliance.coverage_percentage}
          trendLabel="coverage"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">7-Day Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="vulnerabilities" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Severity Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <ActivityItem
              title="Critical vulnerability detected"
              description="SQL injection found in authentication endpoint"
              time="2 minutes ago"
              severity="critical"
            />
            <ActivityItem
              title="Network anomaly detected"
              description="Unusual traffic pattern from 192.168.1.45"
              time="15 minutes ago"
              severity="high"
            />
            <ActivityItem
              title="Scan completed"
              description="Vulnerability scan for api.example.com finished"
              time="1 hour ago"
              severity="info"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'blue' | 'red' | 'green' | 'purple';
  trend?: number;
  trendLabel?: string;
}

function MetricCard({ title, value, icon, color, trend, trendLabel }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className="flex items-center text-sm text-gray-500">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      {trendLabel && <p className="text-xs text-gray-500">{trendLabel}</p>}
    </div>
  );
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  severity: 'critical' | 'high' | 'info';
}

function ActivityItem({ title, description, time, severity }: ActivityItemProps) {
  const severityColors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="flex items-start space-x-4">
      <div className={`mt-1 h-2 w-2 rounded-full ${severityColors[severity]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
    </div>
  );
}
