import React, { useRef } from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { customNotification } from "../../../utils/Notifications";
import { useCreateStudetProjectMutation } from "../../../features/api/studentProjectApi";
import { useGetCategoriesQuery } from "../../../features/api/categoryApi";
import { useNavigate } from "react-router";

const { Option } = Select;

type FieldType = {
  title?: string;
  description?: string;
  categoryId?: number | string;
  price?: number | string;
  skill?: string;
  lectures?: number | string;
  duration?: any;
  file?: any;
  rating?: number | string;
};

const StudentProjectCreate: React.FC = () => {
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const [createStudentProject, { isLoading }] =
    useCreateStudetProjectMutation();
  const { data: categories } = useGetCategoriesQuery("");

  const onFinish = async (values: FieldType) => {
    const formData = new FormData();
    formData.append("title", String(values.title));
    formData.append("description", values.description || "");
    formData.append("categoryId", String(values.categoryId || ""));
    formData.append("file", values.file.file);
    const { error, data }: any = await createStudentProject(formData);
    if (!error) {
      formRef.current.resetFields();
    }
    if (error) {
      customNotification("error", "topRight", error.data?.message, "");
    } else {
      customNotification("success", "topRight", data?.message, "");
      navigate("/dashboard/student-projects");
    }
  };

  return (
    <>
      <h5 className="mb-3">Student Project Create</h5>
      <div className="col-12 col-lg-8">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          ref={formRef}
        >
          <div className="row">
            <div className="col-12 col-lg-6">
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please input student project title!" },
                ]}
              >
                <Input placeholder="Enter student project title" />
              </Form.Item>
            </div>
            <div className="col-12 col-lg-6">
              <Form.Item
                label="Category"
                name="categoryId"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select placeholder="Select category">
                  {categories &&
                    categories.data &&
                    categories.data.map((category: any) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-12">
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input student project description!",
                  },
                ]}
              >
                <Input.TextArea placeholder="Enter course student project description" />
              </Form.Item>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <Form.Item
              label="Cover Photo"
              name="file"
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Upload
                accept="image/*"
                listType="picture"
                maxCount={1} // If you want to allow only one file to be uploaded
                beforeUpload={() => false} // This function prevents automatic upload
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="text-end">
            <Form.Item>
              <Button
                type="default"
                className="me-2"
                onClick={() => navigate("/dashboard/student-projects")}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default StudentProjectCreate;
