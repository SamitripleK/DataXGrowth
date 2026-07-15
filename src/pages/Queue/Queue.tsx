import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { PageHeader } from "@/components/common/PageHeader";
import { QueueDrawer } from "@/components/feature/QueueDrawer";
import { QUEUE } from "@/constants/queue";
import { CLIENTS } from "@/constants/clients";
import { priorityStyle, statusStyle } from "@/utils/queueStyles";
import type { QueueItem } from "@/types/queue";
import styles from "./Queue.module.css";

const STATUS_OPTIONS = ["All", "Pending", "In Progress", "Completed", "Failed"];

const QueuePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [drawerId, setDrawerId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return QUEUE.filter((item) => statusFilter === "All" || item.status === statusFilter)
      .filter((item) => clientFilter === "All" || item.client === clientFilter)
      .filter(
        (item) =>
          !q ||
          item.task.toLowerCase().includes(q) ||
          item.client.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
      );
  }, [search, statusFilter, clientFilter]);

  const drawerItem = QUEUE.find((item) => item.id === drawerId) ?? null;

  const openItem = (item: QueueItem) => {
    if (item.isDigest) {
      navigate(`/queue/digest/${item.id}`);
      return;
    }
    setDrawerId(item.id);
  };

  const columns: ColumnsType<QueueItem> = [
    {
      title: "Task",
      dataIndex: "task",
      width: "26%",
      render: (_, record) => (
        <div style={{ minWidth: 0 }}>
          <div className={styles.taskName}>{record.task}</div>
          <div className={styles.taskMeta}>
            {record.id} · {record.created}
          </div>
        </div>
      ),
    },
    { title: "Client", dataIndex: "client", render: (v: string) => <span className={styles.client}>{v}</span> },
    { title: "Type", dataIndex: "type", render: (v: string) => <span className={styles.type}>{v}</span> },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => {
        const ss = statusStyle(record.status);
        return (
          <span className={styles.statusTag} style={{ color: ss.color, background: ss.bg }}>
            <span className={styles.dot} style={{ background: ss.dot }} />
            {record.status}
          </span>
        );
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (_, record) => {
        const ps = priorityStyle(record.priority);
        return (
          <span className={styles.priority} style={{ color: ps.color }}>
            <span className={styles.priorityDot} style={{ background: ps.dot }} />
            {record.priority}
          </span>
        );
      },
    },
    { title: "Updated", dataIndex: "updated", render: (v: string) => <span className={styles.updated}>{v}</span> },
    {
      title: "",
      key: "action",
      width: 90,
      align: "right",
      render: (_, record) => (
        <Button
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            openItem(record);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <PageHeader title="Queue" subtitle="Review and manage pending tasks, AI jobs, and client updates." />

      <div className={styles.toolbar}>
        <Input
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks"
          prefix={<SearchOutlined style={{ color: "#a6aba2" }} />}
          allowClear
          aria-label="Search tasks"
        />
        <Select
          className={styles.filter}
          value={statusFilter}
          onChange={setStatusFilter}
          aria-label="Filter by status"
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: s === "All" ? "All statuses" : s }))}
        />
        <Select
          className={styles.filter}
          value={clientFilter}
          onChange={setClientFilter}
          aria-label="Filter by client"
          options={[
            { value: "All", label: "All clients" },
            ...CLIENTS.map((c) => ({ value: c.name, label: c.name })),
          ]}
        />
      </div>

      <div className="tableCard">
        <Table<QueueItem>
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={false}
          scroll={{ x: 900 }}
          rowClassName={styles.row}
          locale={{ emptyText: "No tasks match your filters." }}
          onRow={(record) => ({ onClick: () => openItem(record) })}
        />
      </div>

      <QueueDrawer item={drawerItem} open={Boolean(drawerItem)} onClose={() => setDrawerId(null)} />
    </div>
  );
};

export default QueuePage;
