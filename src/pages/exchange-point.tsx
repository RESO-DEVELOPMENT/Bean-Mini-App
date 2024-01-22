import React, { useState } from "react";
import { Page, Button, Text } from "zmp-ui";
import { AppBar } from "./appBar";

const DataExchangePage = () => {
  const [points, setPoints] = useState(0);
  const [data, setData] = useState(0);

  const conversionRates = {
    1000: { data: 1, imageUrl: "docs/dummy/product-square-8.jpg" },
    2000: { data: 2, imageUrl: "docs/dummy/product-square-8.jpg" },
    3000: { data: 3, imageUrl: "docs/dummy/product-square-8.jpg" },
    5000: { data: 4, imageUrl: "docs/dummy/product-square-8.jpg" },
  };

  const convertPointsToData = (selectedPoints) => {
    const convertedData = conversionRates[selectedPoints] || 0;
    setPoints(selectedPoints);
    setData(convertedData);
  };

  return (
    <Page>
      <AppBar />
      <div className="c mt-10 mb-20">
        {Object.keys(conversionRates).map((pointsValue) => (
          <div key={pointsValue} className="ca">
            <img
              src={conversionRates[pointsValue].imageUrl}
              alt={`Card image for ${pointsValue} points`}
            />
            <div className="card-content">
              <Text>{pointsValue} point</Text>
              <Text>{conversionRates[pointsValue].data} ly cà phê </Text>
              <Button
                className="ml-16 mt-9"
                onClick={() => convertPointsToData(pointsValue)}
              >
                Đổi điểm
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export default DataExchangePage;
