
import { axiosInstances } from 'utils/axios';
import { membershipApi } from './member';

const requestPomotion = axiosInstances.promotion;

const apiKey = "E40D5DEE-FC46-4BA1-A2F3-E50A8140D1A6";

const getVouchersForSale = () => {
  return requestPomotion.get(
    `/voucher-groups/for-sale?apiKey=${apiKey}`
  );
};

export const voucherGroupApi = {
    getVouchersForSale
};
