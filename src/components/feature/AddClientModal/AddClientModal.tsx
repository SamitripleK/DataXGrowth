import { App, Button, Form, Input, Modal } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styles from "./AddClientModal.module.css";
import type { AddClientFormValues, AddClientModalProps } from "./types";

const ModalTitle = () => (
  <div className={styles.header}>
    <span className={styles.iconTile}>
      <UserAddOutlined />
    </span>
    <div>
      <div className={styles.title}>New Client</div>
      <div className={styles.subtitle}>Create a new client workspace.</div>
    </div>
  </div>
);

export const AddClientModal = ({ open, onClose }: AddClientModalProps) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<AddClientFormValues>();
  const name = Form.useWatch("name", form);
  const email = Form.useWatch("email", form);
  const canSubmit = Boolean(name?.trim()) && Boolean(email?.trim());

  const handleFinish = (values: AddClientFormValues) => {
    message.success(`${values.name} added`);
    form.resetFields();
    onClose();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      title={<ModalTitle />}
      width={460}
      destroyOnClose
      styles={{ header: { marginBottom: 14 }, body: { paddingTop: 0 } }}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark autoComplete="off">
        <Form.Item
          label="Client Name"
          name="name"
          rules={[{ required: true, message: "Client name is required" }]}
        >
          <Input placeholder="Enter client name" aria-label="Client name" />
        </Form.Item>

        <Form.Item
          label="Contact Email"
          name="email"
          rules={[
            { required: true, message: "Contact email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="Enter contact email" aria-label="Contact email" />
        </Form.Item>

        <Form.Item label="Website" name="website">
          <Input placeholder="example.com" aria-label="Website" />
        </Form.Item>

        <Form.Item label="Industry" name="industry">
          <Input placeholder="Enter industry" aria-label="Industry" />
        </Form.Item>

        <div className={styles.footer}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" disabled={!canSubmit}>
            Add Client
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
