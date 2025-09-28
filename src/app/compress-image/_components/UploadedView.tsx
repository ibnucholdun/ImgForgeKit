import React from "react";

const UploadedView = ({
  url,
  name,
}: {
  url: string | undefined;
  name: string | undefined;
}) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src={url}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />
        <p className="mt-4 text-lg font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default UploadedView;
