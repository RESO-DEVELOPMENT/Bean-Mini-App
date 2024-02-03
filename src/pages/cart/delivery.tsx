import React, { useState, FC } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "state";
import { Box, Icon, Text, Modal, Input } from "zmp-ui";
import { ListRenderer } from "components/list-renderer";
import { StorePicker } from "./store-picker";
import { TimePicker } from "./time-picker";

const AddressPopup = ({ onConfirm, address, setAddress }) => {
  const handleClose = () => {
    onConfirm(address);
  };
  return (
    <Modal
      visible={true}
      title="Nhận món tại"
      onClose={handleClose}
      actions={[
        {
          text: "Xác nhận",
          onClick: () => onConfirm(address),
          highLight: true,
        },
      ]}
    >
      <Box p={4}>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ"
          className="w-full p-2 mb-2 border  rounded"
        />
      </Box>
    </Modal>
  );
};

export const Delivery: FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [showPopup, setShowPopup] = useState(false);
  const [address, setAddress] = useState(cart.deliveryAddress || "");

  const handleAddressChange = (newAddress) => {
    setCart((prevCart) => ({
      ...prevCart,
      deliveryAddress: newAddress,
    }));
    setShowPopup(false);
  };

  return (
    <>
      <Box className="space-y-2 px-4">
        <Text.Header>Hình thức nhận hàng</Text.Header>

        <ListRenderer
          noDivider
          items={[
            {
              left: <Icon icon="zi-location" className="my-auto" />,
              right: (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <StorePicker />
                </React.Suspense>
              ),
            },
            {
              left: <Icon icon="zi-clock-1" className="my-auto" />,
              right: (
                <Box flex className="space-x-2">
                  <Box className="flex-1 space-y-[2px]">
                    <TimePicker />
                    <Text size="xSmall" className="text-gray">
                      Thời gian nhận hàng
                    </Text>
                  </Box>
                  <Icon icon="zi-chevron-right" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-note" className="my-auto" />,
              right: (
                <Box flex>
                  <div
                    onClick={() => setShowPopup(true)}
                    className="cursor-pointer"
                  >
                    {cart.deliveryAddress || "Nhập món tại"}
                  </div>
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
          onConfirm={handleAddressChange}
          address={address}
          setAddress={setAddress}
        />
      )}
    </>
  );
};

export default Delivery;
