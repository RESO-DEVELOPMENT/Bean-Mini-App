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
    <div className="bg-white p-4 rounded-lg shadow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 z-10 mt-10 w-9/12">
      {/* <div className="close-button mb-2 ml-56 cursor-pointer" onClick={onClose}>
        <Icon icon="zi-close" />
      </div> */}
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Nhập địa chỉ"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        className="w-full p-3 bg-teal-400 text-white rounded-full mt-2 mb-2 cursor-pointer font-bold text-l"
        onClick={() => onConfirm(address)}
      >
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
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
          onClick={() => setShowPopup(false)}
        ></div>
      )}
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
                <Box flex className="space-x-2">
                  <Box
                    onClick={() => setShowPopup(true)}
                    className="flex-1 space-y-[2px] "
                  >
                    <Text className="text-primary">
                      {cart.deliveryAddress || "Nhận món tại"}
                    </Text>

                    {showPopup && (
                      <AddressPopup
                        onConfirm={handleAddressChange}
                        onClose={() => setShowPopup(false)}
                      />
                    )}
                    <Text size="xSmall" className="text-gray">
                      Nhận món tại
                    </Text>
                  </Box>
                  <Icon icon="zi-chevron-right" />
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
