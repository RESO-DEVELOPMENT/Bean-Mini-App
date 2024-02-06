import React, { Suspense, useEffect } from "react";
import { Box, Page } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Welcome } from "./welcome";
import { Banner } from "./banner";
import { Categories } from "./categories";
import { Recommend } from "./recommend";
import { ProductList } from "./product-list";
import { Divider } from "components/divider";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <Inquiry />

        <Suspense>
          <Categories />
        </Suspense>
        <Divider />
        <Recommend />
        <Divider />
        <ProductList />
        <Divider />
      </Box>
    </Page>
  );
};
export default HomePage;

// import React, { useState, FunctionComponent } from "react";
// import { Page, Text, Box, Icon, Button } from "zmp-ui";
// import { useNavigate } from "react-router";
// import { useToBeImplemented } from "hooks";
// import { DisplayValue } from "components/display/value";
// import point from "static/point.png";
// import wallet from "static/wallet.png";
// import { DisplayPrice } from "components/display/price";
// import { CartIcon } from "components/cart-icon";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import { WelcomeUser } from "pages/wallet/hello";
// import { SwiperAd } from "pages/swiper-ads";
// import { SwiperItem } from "pages/swiper-items";
// import { SwiperEn } from "pages/swiper-entertainment";

// const HomePage: FunctionComponent = () => {
//   const [activeTab, setActiveTab] = useState<string>("home");
//   const onClick = useToBeImplemented();
//   const navigate = useNavigate();

//   const imageStyle: React.CSSProperties = {
//     maxWidth: "100%",
//     height: "60px",
//     borderRadius: "8px",
//     marginRight: "10px",
//   };

//   const flexContainerStyle: React.CSSProperties = {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   };

//   const blueTextStyle: React.CSSProperties = {
//     color: "#14D9C5",
//   };

//   return (
//     <Page>
//       <Box className=" mt-15" style={flexContainerStyle}>
//         <WelcomeUser />
//       </Box>

//       <Box className="bg-white flex  items-center flex-row  m-2 mt-5 ">
//         <Box className="bg-white basis-1/3 items-center flex flex-row border-solid border border-gray text-gray rounded-full p-2 mx-0.5">
//           <img className="w-6 h-6 mr-1" src={point} />
//           <Text className="font-bold">
//             <DisplayValue value={3000} unit="ps" />
//           </Text>
//         </Box>

//         <Box className="bg-white basis-1/3 items-center flex flex-row border-solid border border-gray text-gray rounded-full p-2 mx-1">
//           <img className="w-6 h-6 mr-1" src={wallet} />
//           <Text className="font-bold">
//             <DisplayPrice>{30000}</DisplayPrice>
//           </Text>
//         </Box>
//         <Box
//           onClick={() => navigate("/cart")}
//           className="bg-white mx-1 border-solid border border-gray text-gray rounded-full p-2 ml-1"
//         >
//           <Icon icon="zi-search" />
//         </Box>

//         <Box
//           onClick={() => navigate("/notification")}
//           className="bg-white border-solid border border-gray text-gray rounded-full p-2 ml-1"
//         >
//           <Icon icon="zi-save-to-collection" />
//         </Box>
//       </Box>
//       <SwiperAd />
//       <Box className="ml-5 mt-10 mr-5" style={flexContainerStyle}>
//         <Text.Title size="large">Dịch vụ</Text.Title>
//         <Text.Title style={blueTextStyle}>Tất cả</Text.Title>
//       </Box>
//       <SwiperItem />

//       <Box className="ml-5 mt-10 mr-5" style={flexContainerStyle}>
//         <Text.Title size="large">Gian Hàng Giải Trí</Text.Title>
//         <Text.Title style={blueTextStyle}>Tất cả</Text.Title>
//       </Box>
//       <SwiperEn />
//     </Page>
//   );
// };
// export default HomePage;
