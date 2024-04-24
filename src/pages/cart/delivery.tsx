import React, { useState, FC } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { cartState, selectedStoreState } from "state";
import { Box, Icon, Text, Modal, Input } from "zmp-ui";
import { ListRenderer } from "components/list-renderer";
import { StorePicker } from "./store-picker";
import { TimePicker } from "./time-picker";
import { LocationPicker } from "./location-picker";

const AddressPopup = ({ onConfirm, address, setAddress }) => {
  const handleClose = () => {
    onConfirm(address);
  };
  return (
    <Modal
      visible={true}
      title="Ghi chú"
      onClose={handleClose}
      actions={[
        {
          text: "Xác nhận",
          onClick: () => onConfirm(address),
          highLight: true,
        },
      ]}
    >
      <Input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Nhập ghi chú"
        className="w-full border rounded"
      />
    </Modal>
  );
};

export const Delivery: FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const store = useRecoilValueLoadable(selectedStoreState);
  const [showPopup, setShowPopup] = useState(false);
  const [notes, setNotes] = useState(cart.notes || "");

  const handleNotesChange = (notes) => {
    setCart((prevCart) => ({
      ...prevCart,
      notes: notes,
    }));
    setShowPopup(false);
  };

  return (
    <>
      <Box className="space-y-2 px-4">
        <Text.Header>Thông tin đơn hàng</Text.Header>
        <ListRenderer
          noDivider
          items={[
            {
              left: <Icon icon="zi-home" className="my-auto" />,
              right: (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Box>
                    <Text size="small" className="text-primary">
                      {store.contents.name || "Cửa hàng"}
                    </Text>
                    <Text size="xSmall" className="text-gray">
                      {"Cửa hàng"}
                    </Text>
                  </Box>
                </React.Suspense>
              ),
            },
            {
              left: <Icon icon="zi-location" className="my-auto" />,
              right: (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <LocationPicker />
                </React.Suspense>
              ),
            },
            // {
            //   left: <Icon icon="zi-clock-1" className="my-auto" />,
            //   right: (
            //     <Box flex className="space-x-2">
            //       <Box className="flex-1 space-y-[2px]">
            //         <TimePicker />
            //         <Text size="xSmall" className="text-gray">
            //           Thời gian nhận hàng
            //         </Text>
            //       </Box>
            //       <Icon icon="zi-chevron-right" />
            //     </Box>
            //   ),
            // },
            {
              left: <Icon icon="zi-note" className="my-auto" />,
              right: (
                <Box onClick={() => setShowPopup(true)}>
                  <Text size="small" className="text-primary overflow-y-auto">
                    {cart.notes || "Nhập ghi chú đơn hàng.."}
                  </Text>
                  <Text size="xSmall" className="text-gray">
                    {"Ghi chú"}
                  </Text>
                </Box>
              ),
            },
          ]}
          limit={4}
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
        />
      </Box>
      {showPopup && (
        <AddressPopup
          onConfirm={handleNotesChange}
          address={notes}
          setAddress={setNotes}
        />
      )}
    </>
  );
};

export default Delivery;
