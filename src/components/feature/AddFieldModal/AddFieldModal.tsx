import { Button, Form, Input, Modal, Select } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ProfileFieldType } from "@/types/profile";
import type { AddFieldFormValues, AddFieldModalProps } from "./types";

const FIELD_TYPE_OPTIONS = [
  { value: ProfileFieldType.Text, label: "Text" },
  { value: ProfileFieldType.Area, label: "Long text" },
  { value: ProfileFieldType.Number, label: "Number" },
  { value: ProfileFieldType.Toggle, label: "Yes / No" },
  { value: ProfileFieldType.Select, label: "Single select" },
  { value: ProfileFieldType.MultiSelect, label: "Multi-select" },
  { value: ProfileFieldType.Chips, label: "Tags" },
];

const hasOptions = (type?: ProfileFieldType) =>
  type === ProfileFieldType.Select || type === ProfileFieldType.MultiSelect;

export const AddFieldModal = ({ open, onClose, onAdd }: AddFieldModalProps) => {
  const [form] = Form.useForm<AddFieldFormValues>();
  const type = Form.useWatch("type", form);

  const handleFinish = (values: AddFieldFormValues) => {
    const options = (values.options ?? [])
      .map((option) => option?.label?.trim())
      .filter((label): label is string => Boolean(label));
    onAdd(values.label.trim(), values.type, hasOptions(values.type) ? options : undefined);
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

        {hasOptions(type) ? (
          <Form.Item label="Options" style={{ marginBottom: 0 }}>
            <Form.List name="options">
              {(optionFields, { add, remove }) => (
                <>
                  {optionFields.map((optionField) => (
                    <div
                      key={optionField.key}
                      style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}
                    >
                      <Form.Item
                        name={[optionField.name, "label"]}
                        style={{ flex: 1, marginBottom: 0 }}
                        rules={[{ required: true, message: "Option label is required" }]}
                      >
                        <Input placeholder="Option label" aria-label="Option label" />
                      </Form.Item>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(optionField.name)}
                        aria-label="Remove option"
                      />
                    </div>
                  ))}
                  <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add()}>
                    Add option
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
        ) : null}
      </Form>
    </Modal>
  );
};
