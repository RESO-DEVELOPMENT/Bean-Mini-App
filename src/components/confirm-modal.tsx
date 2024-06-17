import React, { FC, SetStateAction } from "react";
import { Modal } from "zmp-ui";

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
  yesTitle = "Yes",
  noTitle = "No",
  description,
  title,
  visible,
  setVisible,
}) => {
  return (
    <Modal
    className="text-center"
      visible={visible}
      title={title}
      onClose={() => {
        setVisible(false);
      }}
     
      actions={[
        {
          text: `${yesTitle}`,
          highLight: true,
          onClick: handleYes,
        },
        {
          text: `${noTitle}`,
          close: true,
          onClick: handleNo,
        },
      ]}
      description={description}
    />
  );
};

export default ConfirmModal;
