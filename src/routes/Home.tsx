import { modifyMeasure } from "@gooddata/sdk-model";
import { BarChart } from "@gooddata/sdk-ui-charts";
import React from "react";

import Page from "../components/Page";
import * as Md from "../md/full";

const Revenue = modifyMeasure(Md.Revenue, (m) => m.format("#,##0"));
const Product = Md.Product.Default;

const style = { height: 300 };

const Home: React.FC = () => {
    return (
        <Page>
            <div style={style} className="s-bar-chart">
                <BarChart measures={[Revenue, Product]} />
            </div>
        </Page>
    );
};

export default Home;
