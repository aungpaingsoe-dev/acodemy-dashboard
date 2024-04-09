import React, { useRef, useEffect, useState } from "react";
import { Button, Form, Input, Upload, Card, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { customNotification } from "../../../utils/Notifications";
import { useNavigate, useParams } from "react-router";
import Loader from "../../../components/Loader";
import { CloseOutlined } from "@ant-design/icons";
import {
  useEditTeamMemberMutation,
  useGetTeamMemberQuery,
} from "../../../features/api/ourTeamMemberApi";

type FieldType = {
  name: string;
  position: string;
  contact: string;
  file?: any;
};

const OurTeamMemberEdit: React.FC = () => {
  const { id } = useParams();
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const [ editTeamMember, { isLoading }] = useEditTeamMemberMutation();
  const { data, isLoading: getTeamMemberLoading } = useGetTeamMemberQuery(id);
  const [fileList, setFileList]: any = useState<UploadFile[]>([]);

  const onFinish = async (values: FieldType) => {

    const formData = new FormData();
    formData.append("name", String(values.name));
    formData.append("position", values.position || "");
    formData.append("contact", JSON.stringify(values.contact));
    formData.append("file", values.file.file);
    const { error, data }: any = await  editTeamMember({ id, body: formData });
    if (!error) {
      formRef.current.resetFields();
    }
    if (error) {
      customNotification("error", "topRight", error.data?.message, "");
    } else {
      customNotification("success", "topRight", data?.message, "");
      navigate("/dashboard/our-team-members");
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
        position: data.data.position,
        file: data.data.imageUrl,
        contact: data.data.contact,
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
      <h5 className="mb-3">Team Member Edit</h5>
      {getTeamMemberLoading ? (
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
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input team member name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter team member name" />
                </Form.Item>
              </div>
              <div className="col-12 col-lg-6">
                <Form.Item
                  label="Position"
                  name="position"
                  rules={[
                    {
                      required: true,
                      message: "Please input team member position!",
                    },
                  ]}
                >
                  <Input placeholder="Enter team member position" />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <Form.List name="contact">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}
                  >
                    {fields.map((field) => (
                      <Card
                        size="small"
                        title={`Contact Section ${field.name + 1}`}
                        key={field.key}
                        extra={
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                      >
                        <Form.Item
                          label="Contact Icon"
                          name={[field.name, "icon"]}
                        >
                          <Input placeholder="Enter contact svg icon" />
                        </Form.Item>
                        <Form.Item
                          label="Contact Url"
                          name={[field.name, "url"]}
                        >
                          <Input placeholder="Enter contact url" />
                        </Form.Item>
                      </Card>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                      + Add Contact
                    </Button>
                  </div>
                )}
              </Form.List>
            </div>

            <div className="col-12 col-lg-8 mt-3">
              <Form.Item
                label="Member Photo"
                name="file"
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <Upload
                  accept="image/*"
                  listType="picture"
                  maxCount={1} 
                  beforeUpload={() => false} 
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
                  onClick={() => navigate("/dashboard/our-team-members")}
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

export default OurTeamMemberEdit;
