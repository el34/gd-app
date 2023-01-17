import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export interface IDashboardTitleProps {
    title: string;
}

export const DashboardTitle: React.FC<React.PropsWithChildren<IDashboardTitleProps>> = ({ title }) => {
    return <Title level={3}>{`My dashboard ${title.toLowerCase().split("_").join(" ")}`}</Title>;
};
