import { AlertCircle, Info, CheckCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'success' | 'tip' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutStyles: Record<
  CalloutType,
  {
    icon: typeof Info;
    bgGradient: string;
    borderColor: string;
    iconColor: string;
    titleColor: string;
  }
> = {
  info: {
    icon: Info,
    bgGradient: 'from-blue-500/10 via-blue-400/5 to-transparent',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-700 dark:text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    bgGradient: 'from-amber-500/10 via-amber-400/5 to-transparent',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-700 dark:text-amber-400',
  },
  success: {
    icon: CheckCircle,
    bgGradient: 'from-green-500/10 via-green-400/5 to-transparent',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-500',
    titleColor: 'text-green-700 dark:text-green-400',
  },
  tip: {
    icon: Lightbulb,
    bgGradient: 'from-purple-500/10 via-purple-400/5 to-transparent',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-500',
    titleColor: 'text-purple-700 dark:text-purple-400',
  },
  danger: {
    icon: AlertCircle,
    bgGradient: 'from-red-500/10 via-red-400/5 to-transparent',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-500',
    titleColor: 'text-red-700 dark:text-red-400',
  },
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = calloutStyles[type];
  const Icon = style.icon;

  return (
    <div
      className={`my-8 overflow-hidden rounded-2xl border ${style.borderColor} bg-gradient-to-r ${style.bgGradient} backdrop-blur-sm`}
      role="alert"
      aria-label={`${type} callout`}
    >
      <div className="flex gap-4 p-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${style.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          {title && (
            <h4 className={`text-lg font-bold ${style.titleColor}`}>
              {title}
            </h4>
          )}
          <div className="text-base leading-relaxed text-foreground/90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
