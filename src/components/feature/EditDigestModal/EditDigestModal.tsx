import { App, Button, Col, Form, Input, Modal, Row, Select } from "antd";
import type { EditDigestModalProps } from "./types";

const { TextArea } = Input;

const INITIAL_VALUES = {
  title: "Daily Growth Pulse — Northwind Labs",
  status: "Yellow",
  insight1:
    "Marketing-sourced pipeline increased 12% WoW. Likely driver: paid CPL improved while organic sessions continued to grow. Action: Review paid landing page performance before increasing spend.",
  insight2:
    "Organic search showed early positive movement. Three target keywords moved onto page one. Action: Review top gaining queries and update priority pages.",
  insight3:
    "ABM campaign is still blocked by creative approval. Launch delay may affect this week's pipeline target. Action: Get client sign-off on ABM creative today.",
  platformWatch: "Google core update is rolling out. Monitor non-brand rankings this week.",
  openItems: "ABM creative pending client sign-off\nCompetitor pricing teardown due Friday",
};

const STATUS_OPTIONS = ["Green", "Yellow", "Red"].map((s) => ({ value: s, label: s }));

export const EditDigestModal = ({ open, onClose }: EditDigestModalProps) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const handleSave = () => {
    message.success("Digest updated");
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={600}
      title="Edit Digest"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save Changes
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={INITIAL_VALUES}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Digest title" name="title">
              <Input aria-label="Digest title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status" name="status">
              <Select options={STATUS_OPTIONS} aria-label="Status" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Insight 1" name="insight1">
          <TextArea rows={2} aria-label="Insight 1" />
        </Form.Item>
        <Form.Item label="Insight 2" name="insight2">
          <TextArea rows={2} aria-label="Insight 2" />
        </Form.Item>
        <Form.Item label="Insight 3" name="insight3">
          <TextArea rows={2} aria-label="Insight 3" />
        </Form.Item>
        <Form.Item label="Platform Watch" name="platformWatch">
          <TextArea rows={2} aria-label="Platform Watch" />
        </Form.Item>
        <Form.Item label="Open Items" name="openItems">
          <TextArea rows={2} aria-label="Open Items" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
