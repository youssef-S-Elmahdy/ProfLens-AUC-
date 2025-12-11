import React from 'react';

const RatingBar = ({ label, value, maxValue = 5, color = 'blue' }) => {
  const percentage = (value / maxValue) * 100;

  const colorClasses = {
    blue: 'bg-auc-blue-500',
    gold: 'bg-auc-gold-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  const getColor = () => {
    // For difficulty/workload metrics, use color coding
    if (label.toLowerCase().includes('difficulty') || label.toLowerCase().includes('workload')) {
      if (value <= 2) return 'bg-green-500';
      if (value <= 3) return 'bg-yellow-500';
      if (value <= 4) return 'bg-orange-500';
      return 'bg-red-500';
    }
    return colorClasses[color] || colorClasses.blue;
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-slate-900">{value.toFixed(1)}</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default RatingBar;
