import React, { FC, SetStateAction } from "react";
import { Icon, Modal } from "zmp-ui";

interface ConfirmModalProps {
  handleYes?: any;
  handleNo?: any;
  yesTitle?: string;
  noTitle?: string;
  description: string;
  title: string;
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  handleYes = () => {},
  handleNo = () => {},
  yesTitle = "Đồng ý",
  noTitle = "Hủy",
  description,
  title,
  visible,
  setVisible,
}) => {
  return (
    <Modal
      className="relative text-center"
      visible={visible}
      title={title}
      onClose={() => {
        setVisible(false);
      }}
      maskClosable={false}
      actions={[
        {
          text: `${yesTitle}`,
          highLight: true,
          onClick: handleYes,
        },
      ]}
      description={description}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => {
          setVisible(false);
          handleNo();
        }}
      >
        <Icon icon="zi-close" />
      </button>
    </Modal>
  );
};

export default ConfirmModal;
