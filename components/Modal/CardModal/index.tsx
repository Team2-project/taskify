import { FC } from "react";
import WriteComment from "@/components/Comments/WriteComment";
import CommentList from "@/components/Comments/CommentList";
import { CommentsResponse } from "@/lib/api/types/comments";
import AssigneeDetails from "./CardDetails/AssigneeDetails";
import { FetchCardDetailsResponse } from "@/lib/api/types/cards";
import CardDescription from "./CardDetails/CardDescription";
import Tag from "@/components/Tag/Tag";
import CloseButton from "./CardDetails/CloseButton";
import CardDropdown from "./CardDetails/CardDropdown";
import ColumnTitle from "./CardDetails/ColumnTitle";

const mockCardDetails: FetchCardDetailsResponse = {
  id: 8719,
  title: "카드생성테스트",
  description: "테스트랍니다",
  tags: ["곽철", "To Do", "프로젝트", "일반"],
  dueDate: "2024-06-29 15:00",
  assignee: {
    profileImageUrl:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/6-2_4027_1719820913175.jpeg",
    nickname: "곽철이",
    id: 4027,
  },
  imageUrl:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/6-2_33068_1719660018079.jpeg",
  teamId: "6-2",
  columnId: 33066,
  createdAt: "2024-06-28T18:08:12.021Z",
  updatedAt: "2024-06-28T18:08:12.021Z",
};

interface ModalProps {
  isOpen: boolean;
  value: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  subTitle: string;
  commentsResponse: CommentsResponse;
}

const CardModal: FC<ModalProps> = ({
  isOpen,
  value,
  onClose,
  onSubmit,
  title,
  subTitle,
  commentsResponse,
}) => {
  if (!isOpen) return null;

  const handleEdit = (id: number) => {
    console.log(`Edit clicked for comment ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete clicked for comment ID: ${id}`);
  };

  return (
    <div className='fixed inset-0 flex min-w-[370px] items-center justify-center bg-black bg-opacity-50'>
      <div className='mx-[24px] max-h-screen w-full overflow-y-auto rounded-[8px] bg-white p-[20px] shadow-lg tablet:max-h-[770px] tablet:w-auto tablet:max-w-[680px] desktop:max-h-[770px] desktop:w-auto desktop:max-w-[730px]'>
        {/* Header Section */}
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>{mockCardDetails.title}</h2>
          <div className='flex space-x-2'>
            <CardDropdown />
            <CloseButton onClose={onClose} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='block tablet:hidden'>
          <div className='my-[16px]'>
            <AssigneeDetails cardDetails={mockCardDetails} />
          </div>
          <div className='my-[16px] flex flex-wrap items-center space-x-[8px]'>
            <ColumnTitle columnId={mockCardDetails.columnId} />
            <span className='text-gray-300 font-bold'>|</span>
            {mockCardDetails.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
          <div className='mb-[20px]'>
            <CardDescription cardDetails={mockCardDetails} />
          </div>
          <WriteComment />
          <div className='mb-[16px]'>
            <CommentList
              commentsResponse={commentsResponse}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {/* Tablet과 Desktop Layout */}
        <div className='hidden tablet:grid tablet:grid-cols-3 tablet:gap-4'>
          <div className='col-span-2 flex items-center'>
            <ColumnTitle columnId={mockCardDetails.columnId} />
            <span className='mx-2 font-bold text-gray-30'>|</span>
            <div className='flex flex-wrap items-center space-x-[8px]'>
              {mockCardDetails.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          </div>
          <div className='col-span-1 row-span-3'>
            <AssigneeDetails cardDetails={mockCardDetails} />
          </div>
          <div className='col-span-2 mb-[20px]'>
            <CardDescription cardDetails={mockCardDetails} />
          </div>
          <div className='col-span-1'></div>
          <div className='col-span-2'>
            <WriteComment />
          </div>
          <div className='col-span-1'></div>
          <div className='col-span-2 mb-[16px]'>
            <CommentList
              commentsResponse={commentsResponse}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
          <div className='col-span-1'></div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
