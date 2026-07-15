import {
  GlobalOutlined,
  BankOutlined,
  TagOutlined,
  AimOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import type { ProfileFieldIcon } from "@/types/profile";

const ICONS: Partial<Record<ProfileFieldIcon, React.ReactNode>> = {
  globe: <GlobalOutlined />,
  building: <BankOutlined />,
  tag: <TagOutlined />,
  target: <AimOutlined />,
  shield: <SafetyOutlined />,
};

export const renderFieldIcon = (icon?: ProfileFieldIcon): React.ReactNode =>
  icon ? (ICONS[icon] ?? null) : null;
