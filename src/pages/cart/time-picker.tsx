import React, { FC, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartState, selectedDeliveryTimeState } from "state";
import { Cart } from "types/cart";
import { displayDate, displayHalfAnHourTimeRange } from "utils/date";
import { matchStatusBarColor } from "utils/device";
import { Picker } from "zmp-ui";

export const TimePicker: FC = () => {
  const [date, setDate] = useState(+new Date());
  const [time, setTime] = useRecoilState(selectedDeliveryTimeState);
  const [cart, setCart] = useRecoilState(cartState);

  const availableDates = useMemo(() => {
    const days: Date[] = [];
    const today = new Date();
    days.push(today);
    return days;
  }, []);

  const availableTimes = useMemo(() => {
    const times: Date[] = [];
    const now = new Date();
    let time = new Date();
    if (now.getDate() === new Date(date).getDate()) {
      const minutes = Math.ceil(now.getMinutes() / 30) * 30;
      time.setHours(now.getHours());
      time.setMinutes(minutes);
    } else {
      // Starting time is 7:00
      time.setHours(7);
      time.setMinutes(0);
    }
    time.setSeconds(0);
    time.setMilliseconds(0);
    const endTime = new Date();
    endTime.setHours(21);
    endTime.setMinutes(0);
    endTime.setSeconds(0);
    endTime.setMilliseconds(0);
    while (time <= endTime) {
      times.push(new Date(time));
      time.setMinutes(time.getMinutes() + 30);
    }
    return times;
  }, [date]);

  return (
    <Picker
      mask
      maskClosable
      onVisibilityChange={(visbile) => matchStatusBarColor(visbile)}
      inputClass="border-none bg-transparent text-sm text-primary font-medium text-md m-0 p-0 h-auto"
      placeholder="Chọn thời gian nhận hàng"
      title="Thời gian nhận hàng"
      value={{
        date,
        time: availableTimes.find((t) => +t === time)
          ? time
          : +availableTimes[0],
      }}
      formatPickedValueDisplay={({ date, time }) =>
        date && time
          ? `${displayHalfAnHourTimeRange(new Date(time.value))}, ${displayDate(
              new Date(date.value)
            )}`
          : `Chọn thời gian`
      }
      onChange={({ date, time }) => {
        if (date) {
          setDate(+date.value);
        }
        if (time) {
          setTime(+time.value);
          console.log("time", time.value);
          setCart((prevCart) => {
            let res = { ...prevCart };
            res = {
              ...prevCart,
              customerNote: `${displayHalfAnHourTimeRange(
                new Date(time.value)
              )}, ${displayDate(new Date(date.value))}`,
            };
            return res;
          });
        }
      }}
      data={[
        {
          options: availableTimes.map((time, i) => ({
            displayName: displayHalfAnHourTimeRange(time),
            value: +time,
          })),
          name: "time",
        },
        {
          options: availableDates.map((date, i) => ({
            displayName: displayDate(date, true),
            value: +date,
          })),
          name: "date",
        },
      ]}
    />
  );
};
