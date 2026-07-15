import { useState } from "react";
import { App, Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { PageHeader } from "@/components/common/PageHeader";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { ADMIN_USERS } from "@/constants/users";
import type { AdminUser } from "@/types/user";
import styles from "./Users.module.css";

const UsersPage = () => {
  const { message, modal } = App.useApp();
  const [email, setEmail] = useState("");

  const addUser = () => {
    message.success(email.trim() ? `Invite sent to ${email.trim()}` : "User invited");
    setEmail("");
  };

  const removeUser = (user: AdminUser) => {
    modal.confirm({
      title: "Remove user?",
      content: `${user.email} will lose access to the DataXGrowth AI admin console. This can't be undone.`,
      okText: "Remove user",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => message.success(`User removed: ${user.email}`),
    });
  };

  const columns: ColumnsType<AdminUser> = [
    {
      title: "Email",
      dataIndex: "email",
      width: "44%",
      render: (_, record) => (
        <div className={styles.userCell}>
          <InitialsAvatar initials={record.initials} size={30} fontSize={11.5} radius={8} />
          <span className={styles.email}>{record.email}</span>
        </div>
      ),
    },
    { title: "Added by", dataIndex: "addedBy", render: (v: string) => <span className={styles.muted}>{v}</span> },
    { title: "Added date", dataIndex: "date", render: (v: string) => <span className={styles.muted}>{v}</span> },
    {
      title: "",
      key: "remove",
      width: 56,
      align: "right",
      render: (_, record) => (
        <Button
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeUser(record)}
          aria-label={`Remove ${record.email}`}
        />
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <PageHeader title="Users" subtitle="Manage who can access the DataXGrowth AI admin console." />

      <div className={styles.addCard}>
        <div className={styles.addLabel}>Add user by email</div>
        <div className={styles.addRow}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@dataxgrowth.ai"
            aria-label="New user email"
            onPressEnter={addUser}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={addUser}>
            Add User
          </Button>
        </div>
      </div>

      <div className="tableCard">
        <Table<AdminUser> columns={columns} dataSource={ADMIN_USERS} rowKey="email" pagination={false} scroll={{ x: 640 }} />
      </div>
    </div>
  );
};

export default UsersPage;
