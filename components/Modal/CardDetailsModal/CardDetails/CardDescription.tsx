import React, { FC } from "react";
import { FetchCardDetailsResponse } from "@/lib/api/types/cards";

interface CardDescriptionProps {
  cardDetails: FetchCardDetailsResponse;
}

const CardDescription: FC<CardDescriptionProps> = ({ cardDetails }) => {
  const { description, imageUrl } = cardDetails;

  return (
    <div>
      <p className='mb-[16px] text-base'>{description}</p>
      {imageUrl && (
        <img src={imageUrl} alt='Card Image' className='w-full rounded-lg' />
      )}
    </div>
  );
};

export default CardDescription;
