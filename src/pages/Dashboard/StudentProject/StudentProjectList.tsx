import React from "react";
import {
  useDeleteStudentProjectMutation,
  useGetStudentProjectsQuery
} from "../../../features/api/studentProjectApi";
import { Button, Space, Table, Image, Popconfirm } from "antd";
import Loader from "../../../components/Loader";
import type { TableProps } from "antd";
import { FaPlus } from "react-icons/fa6";
import { customNotification } from "../../../utils/Notifications";
import { useNavigate } from "react-router";

const StudentProjectList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading }: any = useGetStudentProjectsQuery("");
  const [deleteStudentProject] = useDeleteStudentProjectMutation();

  const columns: TableProps["columns"] = [
    {
      title: "ID",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Student Photo",
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
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="default"
            onClick={() => navigate(`/dashboard/student-projects-edit/${record.id}`)}
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
    const { data }: any = await deleteStudentProject(record.id);
    customNotification("success", "topRight", "", data?.message);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-3 d-flex justify-content-between">
      <h5 className="mb-0">Student Project List</h5>
        <Button
          type="default"
          className="d-flex align-items-center gap-1"
          onClick={() => navigate("/dashboard/student-projects-create")}
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

export default StudentProjectList;
