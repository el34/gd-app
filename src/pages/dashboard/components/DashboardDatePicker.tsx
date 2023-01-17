import React from "react";
import { DateFilter, DateFilterOption, defaultDateFilterOptions } from "@gooddata/sdk-ui-filters";
import { DateFilterGranularity } from "@gooddata/sdk-model";
import { IDateFilterComponentState } from "../Dashboard";

const availableGranularities: DateFilterGranularity[] = [
    "GDC.time.date",
    "GDC.time.month",
    "GDC.time.quarter",
    "GDC.time.year",
];

const style = { width: 300 };

export interface IDatePickerProps extends IDateFilterComponentState {
    onDatePickerApply: (options: IDateFilterComponentState) => void;
}

export const DashboardDatePicker: React.FC<React.PropsWithChildren<IDatePickerProps>> = ({
    selectedFilterOption,
    excludeCurrentPeriod,
    onDatePickerApply,
}) => {
    const onApply = (selectedFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => {
        onDatePickerApply({ selectedFilterOption, excludeCurrentPeriod });
    };

    return (
        <div style={style}>
            <DateFilter
                excludeCurrentPeriod={excludeCurrentPeriod}
                selectedFilterOption={selectedFilterOption}
                filterOptions={defaultDateFilterOptions}
                availableGranularities={availableGranularities}
                customFilterName="Selected date"
                dateFilterMode="active"
                dateFormat="MM/dd/yyyy"
                onApply={onApply}
            />
        </div>
    );
};
