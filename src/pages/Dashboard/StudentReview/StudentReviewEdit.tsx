import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadFile,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { customNotification } from "../../../utils/Notifications";
import {
  useEditStudentReviewMutation,
  useGetStudentReviewQuery,
} from "../../../features/api/studentReviewApi";
import { useNavigate, useParams } from "react-router";
import Loader from "../../../components/Loader";

type FieldType = {
  name?: string;
  review?: string;
  file?: any;
  rating?: number | string;
};

const StudentReviewCreate: React.FC = () => {
  const { id } = useParams();
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const [editCourse, { isLoading }] = useEditStudentReviewMutation();
  const { data, isLoading: getCourseLoading } = useGetStudentReviewQuery(id);
  const [fileList, setFileList]: any = useState<UploadFile[]>([]);

  const onFinish = async (values: FieldType) => {
    const formData = new FormData();
    formData.append("name", String(values.name));
    formData.append("review", values.review || "");
    formData.append("rating", String(values.rating || ""));
    formData.append("file", values.file.file);

    const { error, data }: any = await editCourse({ id, body: formData });
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

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  useEffect(() => {
    // Set form initial values once data is available
    if (data && data.data) {
      formRef.current.setFieldsValue({
        name: data.data.name,
        review: data.data.review,
        rating: data.data.rating,
      });

      // Set initial value for the Upload component
      const fileList = data.data.imageUrl
        ? [
            {
              uid: "-1",
              name: "image",
              status: "done",
              url: data.data.imageUrl,
            },
          ]
        : [];
      setFileList(fileList);
    }
  }, [data]);

  return (
    <>
      <h5 className="mb-3">Student Review Edit</h5>
      {getCourseLoading ? (
        <Loader />
      ) : (
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
                    {
                      required: true,
                      message: "Please input student review rating!",
                    },
                    { type: "number", message: "Please enter a valid number!" },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter student rating"
                    formatter={(value) => `${value}`.replace(/[^0-9]/g, "")}
                    parser={(value) => `${value}`.replace(/[^0-9]/g, "")}
                    style={{ width: "100%" }}
                  />
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
                  <Input.TextArea placeholder="Enter student review" />
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
                  fileList={fileList}
                  onChange={handleFileChange}
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
      )}
    </>
  );
};

export default StudentReviewCreate;
