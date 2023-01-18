import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Select, Spin, Typography } from "antd";
import { max, min, sum } from "lodash";
import { median } from "mathjs";

const { Title } = Typography;

export interface IDashboardCalculatorProps {
    data?: string[][];
    status?: string;
}

export const DashboardCalculator: React.FC<React.PropsWithChildren<IDashboardCalculatorProps>> = ({
    data,
    status,
}) => {
    const [value, setValue] = useState<number | undefined>(undefined);
    const [selected, setSelected] = useState<string>("max");

    const dataNumberArr: number[][] | null = data
        ? (data?.map((product) => product?.map((str: string) => Number(str))) as unknown as number[][])
        : null;

    const getResultValue = useCallback(() => {
        switch (selected) {
            case "max":
                return dataNumberArr ? sum(dataNumberArr.map((product) => max(product))) : undefined;
            case "min":
                return dataNumberArr ? sum(dataNumberArr.map((product) => min(product))) : undefined;
            case "med":
                return dataNumberArr ? median(dataNumberArr.map((product) => median(product))) : undefined;
            default:
                return undefined;
        }
    }, [dataNumberArr, selected]);

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
                            {data === undefined ? (
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
                                disabled={data === undefined}
                                options={[
                                    {
                                        value: "max",
                                        label: "Maximum Revenue",
                                    },
                                    {
                                        value: "min",
                                        label: "Minimum Revenue",
                                    },
                                    {
                                        value: "med",
                                        label: "Median",
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
