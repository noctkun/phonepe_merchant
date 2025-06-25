interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ReactNode;
  }
  
  export default function StatsCard({ title, value, change, changeType, icon }: StatsCardProps) {
    const changeColor = {
      positive: 'text-green-600',
      negative: 'text-red-600',
      neutral: 'text-gray-600'
    }[changeType];
  
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            <p className={`text-sm mt-1 ${changeColor}`}>
              {changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→'} {change}
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            {icon}
          </div>
        </div>
      </div>
    );
  }
  