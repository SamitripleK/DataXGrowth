import { Button, Form, Input, Modal, Select } from "antd";
import { ProfileFieldType } from "@/types/profile";
import type { AddFieldFormValues, AddFieldModalProps } from "./types";

const FIELD_TYPE_OPTIONS = [
  { value: ProfileFieldType.Text, label: "Text" },
  { value: ProfileFieldType.Area, label: "Long text" },
  { value: ProfileFieldType.Url, label: "URL" },
  { value: ProfileFieldType.Select, label: "Dropdown" },
  { value: ProfileFieldType.Chips, label: "Tags" },
  { value: ProfileFieldType.Toggle, label: "Toggle" },
];

export const AddFieldModal = ({ open, onClose, onAdd }: AddFieldModalProps) => {
  const [form] = Form.useForm<AddFieldFormValues>();

  const handleFinish = (values: AddFieldFormValues) => {
    onAdd(values.label.trim(), values.type);
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
      title="Add field"
      width={440}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={() => form.submit()}>
          Add field
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ type: ProfileFieldType.Text }}
        requiredMark
      >
        <Form.Item
          label="Field label"
          name="label"
          rules={[{ required: true, message: "Field label is required" }]}
        >
          <Input placeholder="e.g. Reimbursement pathway" aria-label="Field label" />
        </Form.Item>
        <Form.Item
          label="Field type"
          name="type"
          rules={[{ required: true, message: "Field type is required" }]}
        >
          <Select options={FIELD_TYPE_OPTIONS} aria-label="Field type" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
