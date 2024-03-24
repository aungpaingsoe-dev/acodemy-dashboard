import React, { useEffect, useRef } from "react";
import { Button, Form, type FormProps, Input } from "antd";
import {
  useEditCategoryMutation,
  useGetCategoryQuery,
} from "../../../features/api/categoryApi";
import { customNotification } from "../../../utils/Notifications";
import { useNavigate, useParams } from "react-router";

type FieldType = {
  name?: string;
};

const CategoryEdit: React.FC = () => {
  const formRef = useRef<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editCategory, { isLoading: editLoading }] = useEditCategoryMutation();
  const { data } = useGetCategoryQuery(id);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const body = {
      name: values.name,
    };
    const { error, data }: any = await editCategory({ id, body });
    if (!error) {
      formRef.current.resetFields();
    }
    if (error) {
      customNotification("error", "topRight", error.data?.message, "");
    } else {
      customNotification("success", "topRight", data?.message, "");
      navigate("/dashboard/categories");
    }
  };

  useEffect(() => {
    // Set form initial values once data is available
    if (data && data.data) {
      formRef.current.setFieldsValue({
        name: data.data.name,
      });
    }
  }, [data]);

  return (
    <>
      <h5 className="mb-3">Category Edit</h5>
      <div className="col-12 col-lg-4">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          ref={formRef}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <div className="text-end">
            <Form.Item>
              <Button
                type="default"
                className="me-2"
                onClick={() => navigate("/dashboard/categories")}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={editLoading}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CategoryEdit;
