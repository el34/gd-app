import React, { useCallback, useEffect, useState } from "react";
import { Row, Select, Typography } from "antd";
import { max, min } from "lodash";
import { median } from "mathjs";

const { Title } = Typography;

export interface IDashboardCalculatorProps {
    data?: string[][];
    productNames?: string[];
}

export const DashboardCalculator: React.FC<React.PropsWithChildren<IDashboardCalculatorProps>> = ({
    data,
    productNames,
}) => {
    const [value, setValue] = useState<number | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<string>("max");
    const [selectedProduct, setSelectedProduct] = useState<string | undefined>(productNames?.[0]);

    const dataNumberArr: number[][] | null = data
        ? (data?.map((product) => product?.map((str: string) => Number(str))) as unknown as number[][])
        : null;

    const getResultValue = useCallback(() => {
        switch (selectedOption) {
            case "max":
                return dataNumberArr && selectedProduct && productNames
                    ? max(dataNumberArr[productNames.indexOf(selectedProduct)])
                    : undefined;
            case "min":
                return dataNumberArr && selectedProduct && productNames
                    ? min(dataNumberArr[productNames.indexOf(selectedProduct)])
                    : undefined;
            case "med":
                return dataNumberArr && selectedProduct && productNames
                    ? median(dataNumberArr[productNames.indexOf(selectedProduct)])
                    : undefined;
            default:
                return undefined;
        }
    }, [dataNumberArr, selectedOption, selectedProduct, productNames]);

    useEffect(() => {
        setValue(getResultValue());
    }, [selectedOption, selectedProduct, getResultValue]);

    return (
        <>
            <Row>
                {value === undefined ? (
                    <Title level={4} style={{ marginTop: 0 }}>
                        N/A
                    </Title>
                ) : (
                    <Title level={4} style={{ marginTop: 0 }}>{`$${Math.round(value)}`}</Title>
                )}
            </Row>
            <Row style={{ marginBottom: 12 }}>
                <Select
                    defaultValue={selectedOption}
                    style={{ width: 250 }}
                    onChange={setSelectedOption}
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
            <Row>
                <Select
                    defaultValue={productNames?.[0]}
                    style={{ width: 250 }}
                    onChange={setSelectedProduct}
                    disabled={data === undefined}
                    options={productNames?.map((name) => {
                        return { value: name, label: name };
                    })}
                />
            </Row>
        </>
    );
};
