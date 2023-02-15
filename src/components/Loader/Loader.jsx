import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => (
  <ThreeDots
    height="100"
    width="100"
    radius="9"
    color="#2c2cb7"
    ariaLabel="three-dots-loading"
    visible={true}
  />
);
