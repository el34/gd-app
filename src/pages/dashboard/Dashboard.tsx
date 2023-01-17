import { MeasureGroupIdentifier, newTwoDimensional } from "@gooddata/sdk-model";
import { useExecutionDataView } from "@gooddata/sdk-ui";
import { LineChart } from "@gooddata/sdk-ui-charts";
import { DateFilterHelpers, DateFilterOption, defaultDateFilterOptions } from "@gooddata/sdk-ui-filters";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "antd";
import { useBackend } from "../../contexts/Auth";
import Page from "../../components/Page";
import { workspace } from "../../constants";
import * as Md from "../../md/full";
import { DashboardDatePicker } from "./components/DashboardDatePicker";
import { DashboardCalculator } from "./components/DashboardCalculator";
import { DashboardTitle } from "./components/DashboardTitle";

const Revenue = Md.Revenue;
const Product = Md.Product.Default;

const style = { height: 600 };

export interface IDateFilterComponentState {
    selectedFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
}

const Dashboard: React.FC = () => {
    const [dateState, setDateState] = useState<IDateFilterComponentState>({
        selectedFilterOption: defaultDateFilterOptions.allTime!,
        excludeCurrentPeriod: false,
    });

    const dateFilter = useMemo(() => {
        return DateFilterHelpers.mapOptionToAfm(
            dateState.selectedFilterOption,
            Md.DateDatasets.Date.ref,
            dateState.excludeCurrentPeriod,
        );
    }, [dateState]);

    const backend = useBackend();

    const execution = backend
        .workspace(workspace)
        .execution()
        .forItems([Product, Revenue, Md.DateDatasets.Date.Month.Long], [dateFilter])
        .withDimensions(
            ...newTwoDimensional([MeasureGroupIdentifier, Product], [Md.DateDatasets.Date.Month.Long]),
        );

    const { result, status } = useExecutionDataView({ execution });

    useEffect(() => {
        console.log(dateFilter);
    }, [dateFilter]);

    const onDatePickerApply = (options: IDateFilterComponentState) => {
        console.log(options);
        setDateState({ ...options });
    };

    return (
        <Page>
            <Row>
                <DashboardTitle
                    title={DateFilterHelpers.getDateFilterTitle(dateState.selectedFilterOption, "en-US")}
                />
            </Row>
            <Row>
                <Col span={24}>
                    <DashboardDatePicker
                        selectedFilterOption={dateState.selectedFilterOption}
                        excludeCurrentPeriod={dateState.excludeCurrentPeriod}
                        onDatePickerApply={onDatePickerApply}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={18}>
                    <div style={style} className="s-line-chart">
                        <LineChart
                            measures={[Revenue]}
                            trendBy={Md.DateDatasets.Date.Month.Long}
                            segmentBy={Product}
                            filters={dateFilter ? [dateFilter] : []}
                        />
                    </div>
                </Col>
                <Col span={6}>
                    <DashboardCalculator data={result?.dataView.data as string[][]} status={status} />
                </Col>
            </Row>
        </Page>
    );
};

export default Dashboard;
