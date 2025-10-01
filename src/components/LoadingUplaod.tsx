import React from "react";

const LoadingProcess = ({ feature }: { feature: string }) => {
  return (
    <div className="from-muted/50 via-background to-muted/30 relative flex flex-grow flex-col items-center justify-center overflow-hidden p-6 text-center sm:p-12">
      <div className="relative z-10">
        <div className="relative mb-6">
          {/* Animated loading rings */}
          <div className="border-muted border-t-primary mx-auto h-16 w-16 animate-spin rounded-full border-4"></div>
          <div
            className="border-r-primary/70 absolute inset-0 mx-auto h-16 w-16 animate-spin rounded-full border-4 border-transparent"
            style={{
              animationDelay: "0.5s",
              animationDirection: "reverse",
            }}
          ></div>
        </div>
        <h3 className="text-foreground mb-2 text-lg font-bold">
          {feature} your image
        </h3>
        <p className="text-muted-foreground text-sm">
          Processing your file with AI magic ✨
        </p>
        <div className="bg-muted mx-auto mt-4 h-2 w-48 overflow-hidden rounded-full">
          <div className="bg-primary h-full animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProcess;
