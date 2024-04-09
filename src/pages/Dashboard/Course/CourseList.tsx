import React from "react";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../../../features/api/courseApi";
import { Button, Space, Table, Popconfirm, Image } from "antd";
import Loader from "../../../components/Loader";
import type { TableProps } from "antd";
import { FaPlus } from "react-icons/fa6";
import { customNotification } from "../../../utils/Notifications";
import { useNavigate } from "react-router";

const CourseList: React.FC = () => {
  const { data, isLoading }: any = useGetCoursesQuery("");
  const navigate = useNavigate();
  const [deleteCategory] = useDeleteCourseMutation();

  const columns: TableProps["columns"] = [
    {
      title: "ID",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => <div key={record.id}>{index + 1}</div>,
    },
    {
      title: "Cover Photo",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) => (
        <Image
          style={{
            width: "100px",
            height: "100",
            objectFit: "cover",
            borderRadius: "5px",
          }}
          src={imageUrl}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "except",
      key: "except",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: any) => category.name,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: any) => `${price} MMK`,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="default"
            onClick={() => navigate(`/dashboard/courses-edit/${record.id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Confirm"
            description="Are you sure to delete?"
            onConfirm={() => confirmDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const confirmDelete = async (record: any) => {
    const { data }: any = await deleteCategory(record.id);
    customNotification("success", "topRight", "", data?.message);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-3 d-flex justify-content-between">
        <h5 className="mb-0">Course List</h5>
        <Button
          type="default"
          className="d-flex align-items-center gap-1"
          onClick={() => navigate("/dashboard/courses-create")}
        >
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
                index: index + 1,
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
