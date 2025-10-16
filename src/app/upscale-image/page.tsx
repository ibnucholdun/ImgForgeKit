import React, { Suspense } from "react";
import UpscaleImageView from "./_components/UpscaleImageView";
import LoadingProcess from "~/components/LoadingUplaod";

const UpscaleImagePage = () => {
  return (
    <Suspense fallback={<LoadingProcess feature="Loading" />}>
      <UpscaleImageView />
    </Suspense>
  );
};

export default UpscaleImagePage;
