import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, SearchOutlined, RightOutlined } from "@ant-design/icons";
import { PageHeader } from "@/components/common/PageHeader";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { AddClientModal } from "@/components/feature/AddClientModal";
import { CLIENTS } from "@/constants/clients";
import type { Client } from "@/types/client";
import styles from "./Clients.module.css";

const ClientsPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLIENTS;
    return CLIENTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q)
    );
  }, [query]);

  const columns: ColumnsType<Client> = [
    {
      title: "Client",
      dataIndex: "name",
      width: "32%",
      render: (_, record) => (
        <div className={styles.client}>
          <InitialsAvatar initials={record.initials} />
          <div style={{ minWidth: 0 }}>
            <div className={styles.clientName}>{record.name}</div>
            <div className={styles.clientWebsite}>{record.website}</div>
          </div>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", render: (email: string) => <span className={styles.email}>{email}</span> },
    {
      title: "Industry",
      dataIndex: "industry",
      render: (industry: string) => <span className={styles.industryTag}>{industry}</span>,
    },
    { title: "Updated", dataIndex: "updated", render: (updated: string) => <span className={styles.updated}>{updated}</span> },
    {
      title: "",
      key: "chevron",
      width: 40,
      align: "right",
      render: () => <RightOutlined style={{ color: "#c7ccc2", fontSize: 13 }} />,
    },
  ];

  return (
    <div className={styles.page}>
      <PageHeader
        title="Clients"
        subtitle="Manage client profiles, integrations, and account context."
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddOpen(true)}>
            Add Client
          </Button>
        }
      />

      <div className={styles.toolbar}>
        <Input
          className={styles.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clients"
          prefix={<SearchOutlined style={{ color: "#a6aba2" }} />}
          allowClear
          aria-label="Search clients"
        />
        <span className={styles.count}>{filtered.length} clients</span>
      </div>

      <div className="tableCard">
        <Table<Client>
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={false}
          scroll={{ x: 720 }}
          rowClassName={styles.row}
          onRow={(record) => ({ onClick: () => navigate(`/clients/${record.id}`) })}
        />
      </div>

      <AddClientModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
};

export default ClientsPage;
