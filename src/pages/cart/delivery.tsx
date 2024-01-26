import React, { useState, FC } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "state";
import { Box, Icon, Text } from "zmp-ui";
import { ListRenderer } from "components/list-renderer";
import { StorePicker } from "./store-picker";
import { TimePicker } from "./time-picker";

const AddressPopup = ({ onConfirm, onClose }) => {
  const [address, setAddress] = useState("");

  return (
    <div className="address-popup">
      <div className="close-button mb-2 ml-72" onClick={onClose}>
        <Icon icon="zi-close" />
      </div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Nhập địa chỉ"
      />
      <button className="font-bold text-l" onClick={() => onConfirm(address)}>
        Xác nhận
      </button>
    </div>
  );
};

export const Delivery: FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddressChange = (address) => {
    setCart((prevCart) => ({
      ...prevCart,
      deliveryAddress: address,
    }));
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && <div className="overlay"></div>}
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
                    className="address-field"
                  >
                    {cart.deliveryAddress || "Nhận món tại"}
                  </div>
                  {showPopup && (
                    <AddressPopup
                      onConfirm={handleAddressChange}
                      onClose={() => setShowPopup(false)}
                    />
                  )}
                </Box>
              ),
            },
          ]}
          limit={4}
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
        />
      </Box>
    </>
  );
};

export default Delivery;
