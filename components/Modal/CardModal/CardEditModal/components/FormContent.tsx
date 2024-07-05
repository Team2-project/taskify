/*
    CardEditModal의 FormContent: 상태 + 담당자 + 제목 + 설명 + 마감일 + 태그 + 카드이미지 업로드 + 수정 + 취소
*/
import { FC } from "react";
import DropDownAssignee from "../InputCardEdit/DropDownAssignee";
import DropDownColumn from "../InputCardEdit/DropDownColumn";
import Input from "../InputCardEdit/Input";
import Textarea from "../InputCardEdit/Textarea";
import Calendar from "../InputCardEdit/Calendar";
import TagInput from "../InputCardEdit/TagInput";
import ImgInput from "../InputCardEdit/ImgInput";
import Button from "@/components/Button";

interface FormContentProps {
  formData: any;
  columnsData: any;
  membersData: any;
  assigneeNickname: string;
  handleChange: any;
  handleTagChange: any;
  handleAssigneeChange: any;
  handleColumnChange: any;
  handleImageChange: any;
  handleDateChange: any;
  handleSubmit: any;
  createButtonText: string;
  cancelButtonText: string;
  onClose: () => void;
}

const FormContent: FC<FormContentProps> = ({
  formData,
  columnsData,
  membersData,
  assigneeNickname,
  handleChange,
  handleTagChange,
  handleAssigneeChange,
  handleColumnChange,
  handleImageChange,
  handleDateChange,
  handleSubmit,
  createButtonText,
  cancelButtonText,
  onClose,
}) => (
  <form onSubmit={handleSubmit}>
    <div className='tablet:flex tablet:items-center tablet:justify-center tablet:gap-[16px]'>
      <DropDownColumn
        subTitle='상태'
        placeholder={
          columnsData?.data.find((col: any) => col.id === formData.columnId)
            ?.title || "Select"
        }
        columnsData={columnsData?.data}
        onColumnSelect={handleColumnChange}
        initialColumnId={formData.columnId}
        initialColumnTitle={
          columnsData?.data.find((col: any) => col.id === formData.columnId)
            ?.title || "Select"
        }
      />
      <DropDownAssignee
        subTitle='담당자'
        placeholder={assigneeNickname || formData.assigneeUserId.toString()}
        dashboardId={formData.dashboardId}
        membersData={membersData?.members}
        onMemberSelect={handleAssigneeChange}
        initialAssigneeId={formData.assigneeUserId}
        initialAssigneeNickname={assigneeNickname}
      />
    </div>
    <Input
      subTitle='제목'
      name='title'
      value={formData.title}
      onChange={handleChange}
    />
    <Textarea
      subTitle='설명'
      name='description'
      value={formData.description}
      onChange={handleChange}
    />
    <Calendar
      subTitle='마감일'
      value={formData.dueDate}
      onChange={handleDateChange}
    />
    <TagInput
      subTitle='태그'
      value={formData.tags.join(",")}
      onChange={handleTagChange}
    />
    <ImgInput
      subTitle='카드 이미지'
      onChange={handleImageChange}
      initialImgUrl={formData.imageUrl} // 초기 이미지 URL 전달
    />
    <div className='mt-[18px] flex w-full items-center justify-center gap-[11px] tablet:mt-[26px] tablet:justify-end'>
      <Button
        type='submit'
        className='h-[50px] w-full rounded-[8px] text-white'
      >
        {createButtonText}
      </Button>
      <Button
        onClick={onClose}
        className='h-[50px] w-full rounded-[8px] border-[1px] border-gray-30 bg-white text-gray-50'
      >
        {cancelButtonText}
      </Button>
    </div>
  </form>
);

export default FormContent;
