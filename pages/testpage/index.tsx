/*
Modal test 페이지, 기능 완성 후 삭제 예정(JIN)
*/

import { FC, useState } from "react";
import CardDetailsModal from "@/components/Modal/CardDetailsModal";
import { CommentsResponse } from "@/lib/api/types/comments";

const mockData: CommentsResponse = {
  cursorId: 0,
  comments: [
    {
      id: 7805,
      content:
        "참치? 꽁치? 갈치? 고등어! 높이 나는 새처럼 날치처럼 태평양을 누비는 참치처럼 푸른 눈과 푸른 등, 푸른 하늘로 높이 날아 올라 올라~ 새우등을 터트린 고래처럼 힘이라면 킹왕짱 물개처럼 굳은 심지 굳은 깡 굳은 의지로 바친 파도 헤쳐 헤쳐",
      createdAt: "2024-07-01T22:47:44.584Z",
      updatedAt: "2024-07-01T22:47:44.584Z",
      cardId: 8719,
      author: {
        id: 4027,
        nickname: "곽철이",
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/6-2_4027_1719820913175.jpeg",
      },
    },
    {
      id: 7804,
      content:
        "젊은날엔 젊음을 모르고 사랑할땐 사랑이 보이지 않았네 하지만 이제 뒤돌아보니우린 젊고 서로 사랑을 했구나. 눈물같은 시간의 강위에 떠내려가는건 한 다발의 추억 그렇게 이제 뒤돌아보니 젊음도 사랑도 아주 소중했구나. 언젠가는 우리 다시 만나리 어디로 가는지 아무도 모르지만 언젠가는 우리 다시 만나리 헤어진 모습 이대로~ ✨",
      createdAt: "2024-07-01T22:45:46.416Z",
      updatedAt: "2024-07-01T22:45:46.416Z",
      cardId: 8719,
      author: {
        id: 4027,
        nickname: "곽철이",
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/6-2_4027_1719820913175.jpeg",
      },
    },
    {
      id: 7803,
      content:
        "Life could be a dream if I could take you to a paradise up above, if you will tell me I'm the only one that you love. Life could be a dream, sweetheart. hopin' we'll meet again!",
      createdAt: "2024-07-01T22:43:23.910Z",
      updatedAt: "2024-07-01T22:43:23.910Z",
      cardId: 8719,
      author: {
        id: 4027,
        nickname: "곽철이",
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/6-2_4027_1719820913175.jpeg",
      },
    },
    {
      id: 7802,
      content: "댓글작성테스트해보려고",
      createdAt: "2024-07-01T22:39:45.963Z",
      updatedAt: "2024-07-01T22:39:45.963Z",
      cardId: 8719,
      author: {
        id: 4027,
        nickname: "곽철이",
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/6-2_4027_1719820913175.jpeg",
      },
    },
  ],
};

const TestPage: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("Initial value");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with value:", inputValue);
    handleCloseModal();
  };

  return (
    <div className='bg-gray-100 flex min-h-screen items-center justify-center'>
      왜 아무것도 안뜨지
      <button
        onClick={handleOpenModal}
        className='bg-blue-500 hover:bg-blue-700 rounded px-4 py-2 text-base'
      >
        Open Modal
      </button>
      <CardDetailsModal
        isOpen={isModalOpen}
        value={inputValue}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title='Test Modal Title'
        subTitle='This is a subtitle for the test page'
        commentsResponse={mockData}
      />
    </div>
  );
};

export default TestPage;
