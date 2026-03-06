import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
}

const OptimizedImage = ({ src, alt, className, ...props }: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const imageSrc = src.startsWith('http') || src.startsWith('data:') || src.startsWith('/') ? src : `/${src}`;

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {!isLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <img
                src={imageSrc}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    isLoaded ? "opacity-100" : "opacity-0",
                    className
                )}
                {...props}
            />
        </div>
    );
};

export default OptimizedImage;
