/*
    CardDetailsModal의 Body: 담당자 + 컬럼명 + 태그 + 설명 + 사진 + 댓글쓰기 + 댓글목록
*/
import { FC } from "react";
import AssigneeDetails from "./AssigneeDetails";
import CardDescription from "./CardDescription";
import ColumnTitle from "./ColumnTitle";
import Tag from "@/components/Tag/Tag";
import WriteComment from "@/components/Comments/WriteComment";
import CommentList from "@/components/Comments/CommentList";

interface BodyProps {
  cardDetails: any;
  cardId: number;
  dashboardId: number;
}

const Body: FC<BodyProps> = ({ cardDetails, cardId, dashboardId }) => (
  <>
    <div className='block tablet:hidden'>
      <div className='my-[16px]'>
        <AssigneeDetails cardDetails={cardDetails} />
      </div>
      <div className='my-[16px] flex flex-wrap items-center space-x-[8px]'>
        <ColumnTitle
          columnId={cardDetails?.columnId}
          dashboardId={dashboardId}
        />
        <span className='font-bold text-gray-30'>|</span>
        {cardDetails.tags.map((tag: string) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <div className='mb-[20px]'>
        <CardDescription cardDetails={cardDetails} />
      </div>
      <WriteComment
        cardId={cardId}
        columnId={cardDetails.columnId}
        dashboardId={dashboardId}
      />
      <div className='mb-[16px]'>
        <CommentList cardId={cardId} />
      </div>
    </div>
    <div className='hidden tablet:grid tablet:grid-cols-3 tablet:gap-4'>
      <div className='col-span-2 flex items-center'>
        <ColumnTitle
          columnId={cardDetails?.columnId}
          dashboardId={dashboardId}
        />
        <span className='mx-2 font-bold text-gray-30'>|</span>
        <div className='flex flex-wrap items-center space-x-[8px]'>
          {cardDetails.tags.map((tag: string) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </div>
      <div className='col-span-1 row-span-3'>
        <AssigneeDetails cardDetails={cardDetails} />
      </div>
      <div className='col-span-2 mb-[20px]'>
        <CardDescription cardDetails={cardDetails} />
      </div>
      <div className='col-span-1'></div>
      <div className='col-span-2'>
        <WriteComment
          cardId={cardId}
          columnId={cardDetails.columnId}
          dashboardId={dashboardId}
        />
      </div>
      <div className='col-span-1'></div>
      <div className='col-span-2 mb-[16px]'>
        <CommentList cardId={cardId} />
      </div>
      <div className='col-span-1'></div>
    </div>
  </>
);

export default Body;
