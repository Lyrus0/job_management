import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    spotlight?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, hover = false, spotlight = false, children, ...props }, ref) => {
        const [position, setPosition] = React.useState({ x: 0, y: 0 });
        const [opacity, setOpacity] = React.useState(0);
        const cardRef = React.useRef<HTMLDivElement>(null);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!spotlight || !cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        };

        return (
            <div
                ref={ref || cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => spotlight && setOpacity(1)}
                onMouseLeave={() => spotlight && setOpacity(0)}
                className={cn(
                    'relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden',
                    hover && 'transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/5',
                    className
                )}
                {...props}
            >
                {/* Spotlight effect */}
                {spotlight && (
                    <div
                        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                        style={{
                            opacity,
                            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 60%)`
                        }}
                    />
                )}
                {children}
            </div>
        );
    }
);
GlassCard.displayName = 'GlassCard';

const GlassCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('p-6 border-b border-white/10', className)}
        {...props}
    />
));
GlassCardHeader.displayName = 'GlassCardHeader';

const GlassCardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn('text-lg font-semibold text-white', className)}
        {...props}
    />
));
GlassCardTitle.displayName = 'GlassCardTitle';

const GlassCardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-white/50 mt-1', className)}
        {...props}
    />
));
GlassCardDescription.displayName = 'GlassCardDescription';

const GlassCardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
));
GlassCardContent.displayName = 'GlassCardContent';

const GlassCardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('p-6 pt-0', className)}
        {...props}
    />
));
GlassCardFooter.displayName = 'GlassCardFooter';

export {
    GlassCard,
    GlassCardHeader,
    GlassCardTitle,
    GlassCardDescription,
    GlassCardContent,
    GlassCardFooter,
};
