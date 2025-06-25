interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ReactNode;
  }
  
  export default function StatsCard({ title, value, change, changeType, icon }: StatsCardProps) {
    const changeColor = {
      positive: 'text-green-600 dark:text-green-400',
      negative: 'text-red-600 dark:text-red-400',
      neutral: 'text-gray-600 dark:text-gray-300'
    }[changeType];
  
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            <p className={`text-sm mt-1 ${changeColor}`}>
              {changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→'} {change}
            </p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
            {icon}
          </div>
        </div>
      </div>
    );
  }
  