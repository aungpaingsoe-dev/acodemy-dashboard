import { Spin } from "antd";

const Loader = () => {
  return (
    <div className=" text-center py-5 ">
      <Spin size="large"></Spin>
    </div>
  );
};

export default Loader;
