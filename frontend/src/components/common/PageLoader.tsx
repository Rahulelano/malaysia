import { Loader2 } from "lucide-react";

const PageLoader = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground animate-pulse">Loading...</p>
        </div>
    );
};

export default PageLoader;
