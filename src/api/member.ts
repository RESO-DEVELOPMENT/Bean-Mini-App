import { axiosInstances } from "utils/axios";

const requestPomotion = axiosInstances.promotion;

const apiKey = "E40D5DEE-FC46-4BA1-A2F3-E50A8140D1A6";

const getMemberships = (phone: string) => {

  return requestPomotion.get(
    `/memberships?apiKey=${apiKey}&phoneNumber=${encodeURIComponent(phone)}&size=100&page=1`
  );
};

export const membershipApi = {
  getMemeberships: getMemberships,
};
