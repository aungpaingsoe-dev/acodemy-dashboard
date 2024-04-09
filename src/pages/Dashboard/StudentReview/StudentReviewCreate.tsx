import React, { useRef } from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { customNotification } from "../../../utils/Notifications";
import { useCreateStudentReviewMutation } from "../../../features/api/studentReviewApi";
import { useNavigate } from "react-router";

const { Option } = Select;

type FieldType = {
  name?: string;
  review?: string;
  file?: any;
  rating?: number | string;
};

const StudentReviewCreate: React.FC = () => {
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const [createStudentReview, { isLoading }] = useCreateStudentReviewMutation();

  const onFinish = async (values: FieldType) => {
    const formData = new FormData();
    formData.append("name", String(values.name));
    formData.append("review", values.review || "");
    formData.append("rating", String(values.rating || ""));
    formData.append("file", values.file.file);
    const { error, data }: any = await createStudentReview(formData);
    if (!error) {
      formRef.current.resetFields();
    }
    if (error) {
      customNotification("error", "topRight", error.data?.message, "");
    } else {
      customNotification("success", "topRight", data?.message, "");
      navigate("/dashboard/student-reviews");
    }
  };

  return (
    <>
      <h5 className="mb-3">Student Review Create</h5>
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
                label="Student Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input student name!",
                  },
                ]}
              >
                <Input placeholder="Enter student name" />
              </Form.Item>
            </div>

            <div className="col-12 col-lg-6">
              <Form.Item
                label="Rating"
                name="rating"
                rules={[
                  { required: true, message: "Please input course rating!" },
                  { type: "number", message: "Please enter a valid number!" },
                ]}
              >
                <Select placeholder="Select course rating" allowClear>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                  <Option value={5}>5</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-12">
              <Form.Item
                label="Review"
                name="review"
                rules={[
                  { required: true, message: "Please input student review!" },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter student review"
                  style={{
                    height: "200px",
                  }}
                />
              </Form.Item>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <Form.Item
              label="Student Photo"
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
                onClick={() => navigate("/dashboard/courses")}
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

export default StudentReviewCreate;
