import React, { useRef } from "react";
import { Button, Form, type FormProps, Input } from "antd";
import { useCreateCategoryMutation } from "../../../features/api/categoryApi";
import { customNotification } from "../../../utils/Notifications";
import { useNavigate } from "react-router";

type FieldType = {
  name?: string;
};

const CategoryCreate: React.FC = () => {
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { error, data }: any = await createCategory({ name: values.name });
    if (!error) {
      formRef.current.resetFields();
    }
    if (error) {
      customNotification("error", "topLeft", error.data?.message, "");
    } else {
      customNotification("success", "topLeft", data?.message, "");
      navigate("/dashboard/categories");
    }
  };

  return (
    <>
      <h5 className="mb-3">Category Create</h5>
      <div className="col-12 col-lg-4">
        <Form
          name="basic"
          initialValues={{ remember: true }}
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

export default CategoryCreate;
