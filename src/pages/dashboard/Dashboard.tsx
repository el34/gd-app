import { modifyMeasure } from "@gooddata/sdk-model";
import { LineChart } from "@gooddata/sdk-ui-charts";
import React from "react";

import Page from "../../components/Page";
import * as Md from "../../md/full";
import DashboardDatePicker from "./components/DashboardDatePicker";

const Revenue = modifyMeasure(Md.Revenue, (m) => m.format("#,##0"));
const Product = Md.Product.Default;

const style = { height: 600 };

const Dashboard: React.FC = () => {
    return (
        <Page>
            <DashboardDatePicker />
            <div style={style} className="s-line-chart">
                <LineChart
                    measures={[Revenue]}
                    trendBy={Md.DateDatasets.Date.Month.Short}
                    segmentBy={Product}
                />
            </div>
        </Page>
    );
};

export default Dashboard;
