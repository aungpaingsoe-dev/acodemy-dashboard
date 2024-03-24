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
  useEditCourseMutation,
  useGetCourseQuery,
} from "../../../features/api/courseApi";
import { useGetCategoriesQuery } from "../../../features/api/categoryApi";
import { useNavigate, useParams } from "react-router";
import Loader from "../../../components/Loader";

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

const CourseEdit: React.FC = () => {
  const { id } = useParams();
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const [editCourse, { isLoading }] = useEditCourseMutation();
  const { data, isLoading: getCourseLoading } = useGetCourseQuery(id);
  const { data: categories } = useGetCategoriesQuery("");
  const [fileList, setFileList]: any = useState<UploadFile[]>([]);

  const onFinish = async (values: FieldType) => {
    const formData = new FormData();
    formData.append("title", String(values.title));
    formData.append("description", values.description || "");
    formData.append("categoryId", String(values.categoryId || ""));
    formData.append("price", String(values.price || ""));
    formData.append("skill", values.skill || "");
    formData.append("lectures", String(values.lectures || ""));
    formData.append("duration", values.duration || "");
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
      navigate("/dashboard/courses");
    }
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  useEffect(() => {
    // Set form initial values once data is available
    if (data && data.data) {
      formRef.current.setFieldsValue({
        title: data.data.title,
        description: data.data.description,
        categoryId: data.data.categoryId,
        price: data.data.price,
        skill: data.data.skill,
        lectures: data.data.lectures,
        duration: data.data.duration,
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
      <h5 className="mb-3">Course Edit</h5>
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
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please input course title!" },
                  ]}
                >
                  <Input placeholder="Enter course title" />
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
              <div className="col-12 col-lg-6">
                <Form.Item
                  label="Skill"
                  name="skill"
                  rules={[
                    { required: true, message: "Please select a skill level!" },
                  ]}
                >
                  <Select placeholder="Select skill level">
                    <Option value="Beginner">Beginner</Option>
                    <Option value="Intermediate">Intermediate</Option>
                    <Option value="Advanced">Advanced</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-12 col-lg-6">
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: "Please input course price!" },
                    { type: "number", message: "Please enter a valid number!" },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter course price"
                    formatter={(value) => `${value}`.replace(/[^0-9]/g, "")}
                    parser={(value) => `${value}`.replace(/[^0-9]/g, "")}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-lg-6">
                <Form.Item
                  label="Lectures"
                  name="lectures"
                  rules={[
                    {
                      required: true,
                      message: "Please input number of lectures!",
                    },
                    { type: "number", message: "Please enter a valid number!" },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter number of lectures"
                    formatter={(value) => `${value}`.replace(/[^0-9]/g, "")}
                    parser={(value) => `${value}`.replace(/[^0-9]/g, "")}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
              <div className="col-12 col-lg-6">
                <Form.Item
                  label="Duration"
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message: "Please input course duration!",
                    },
                  ]}
                >
                  <Input placeholder="Enter course duration" />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-lg-6">
                <Form.Item
                  label="Rating"
                  name="rating"
                  rules={[
                    { required: true, message: "Please input course rating!" },
                    { type: "number", message: "Please enter a valid number!" },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter course rating"
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
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input course description!",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Enter course description" />
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
                  fileList={fileList}
                  onChange={handleFileChange}
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
      )}
    </>
  );
};

export default CourseEdit;
