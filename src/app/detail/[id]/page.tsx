// /detail/[id]/page.tsx
import React from "react";

interface DetailPageProps {
  params: {
    id: string;
  };
}

const DetailPage: React.FC<DetailPageProps> = ({ params }) => {
  return (
    <div>
      <p>Movie ID: {params.id}</p>
    </div>
  );
};

export default DetailPage;
