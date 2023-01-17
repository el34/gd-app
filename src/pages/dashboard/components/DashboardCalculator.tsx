import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Select, Spin, Typography } from "antd";
import { max, min, sum } from "lodash";

const { Title } = Typography;

export interface IDashboardCalculatorProps {
    data?: string[][];
    status?: string;
}

export const DashboardCalculator: React.FC<React.PropsWithChildren<IDashboardCalculatorProps>> = ({
    data,
    status,
}) => {
    console.log(data);
    const [value, setValue] = useState<number | undefined>(undefined);
    const [selected, setSelected] = useState<string>("max");

    const getResultValue = useCallback(() => {
        switch (selected) {
            case "max":
                return sum(data?.map((product) => max(product?.map((str: any) => Number(str)))));
            case "min":
                return sum(data?.map((product) => min(product?.map((str: any) => Number(str)))));
            default:
                return undefined;
        }
    }, [data, selected]);

    useEffect(() => {
        setValue(getResultValue());
    }, [selected, getResultValue]);

    return (
        <div className="site-card-border-less-wrapper">
            <Card title="Revenue across products" bordered={false} style={{ width: 300, height: 200 }}>
                {status === "loading" ? (
                    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
                        <Spin />
                    </div>
                ) : (
                    <>
                        <Row>
                            {value === undefined ? (
                                <Title level={4} style={{ marginTop: 0 }}>
                                    N/A
                                </Title>
                            ) : (
                                <Title level={4} style={{ marginTop: 0 }}>{`$${value}`}</Title>
                            )}
                        </Row>
                        <Row>
                            <Select
                                defaultValue={selected}
                                style={{ width: 250 }}
                                onChange={setSelected}
                                options={[
                                    {
                                        value: "max",
                                        label: "Maximum Revenue",
                                    },
                                    {
                                        value: "min",
                                        label: "Minimum Revenue",
                                    },
                                ]}
                            />
                        </Row>
                    </>
                )}
            </Card>
        </div>
    );
};
