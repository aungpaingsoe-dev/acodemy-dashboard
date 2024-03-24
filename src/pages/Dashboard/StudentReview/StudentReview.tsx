import React from "react";
import { useGetStudentReviewsQuery } from "../../../features/api/studentReviewApi";
import { useSelector } from "react-redux";
import { Button, Space, Table, Image } from "antd";
import Loader from "../../../components/Loader";
import type { TableProps } from "antd";
import { FaPlus } from "react-icons/fa6";

const StudentReview: React.FC = () => {
  const token = useSelector((state: any) => state?.auth?.user?.token);
  const { data, isLoading }: any = useGetStudentReviewsQuery(token);

  const columns: TableProps["columns"] = [
    {
      title: "ID",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => index + 1
    },
    {
      title: "Student Photo",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) => (
        <Image
          style={{ width : "100px", height: "100", objectFit: "cover", borderRadius: "5px" }}
          src={ imageUrl }
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Review",
      dataIndex: "except",
      key: "except",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Actions",
      key: "action",
      render: (_) => (
        <Space>
          <Button type="default">Edit</Button>
          <Button type="default">Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-3 d-flex justify-content-end">
        <Button type="default" className="d-flex align-items-center gap-1">
          <FaPlus /> Create
        </Button>
      </div>
      {/* Table */}
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <Table
              columns={columns}
              dataSource={data?.data.map((item: any, index: number) => ({
                ...item,
                key: `${item.id}-${index}`,
                index: index + 1
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentReview;
