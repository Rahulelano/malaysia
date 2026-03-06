import { Shield, Truck, RotateCcw, HeadphonesIcon } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure payment gateway',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Nationwide shipping in 2-5 days',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '7-day hassle-free returns',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Dedicated customer support',
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 border-y border-border bg-card">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{badge.title}</h4>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
