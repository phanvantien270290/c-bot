import * as React from 'react';
import { useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box/Box'
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    Tooltip,
    ScatterSeries,
    LineSeriesProps,

} from '@devexpress/dx-react-chart-material-ui';
import {
    Animation,
    EventTracker,
    ArgumentScale,
    HoverState,
    ValueScale,
    ModifyDomainFn,
} from '@devexpress/dx-react-chart';
import { format } from 'date-fns';


const worklogColor = "#41c0f0";

const getData = () => {
    let i = -1;
    let data = [];
    while (i++ < 30) {
        const curDate = new Date();
        const date = curDate.setDate(curDate.getDate() - (20 - i));
        data.push({ date, value: Math.floor(Math.random() * 500) });
    }
    return data.map((item: any) => { item.date = format(item.date, 'MM/dd'); return item });
}
const modifyDomain: ModifyDomainFn = (domain) => ([0, domain[1] + ((domain[1] * 10) / 100)])
const formatDate = (scale: any) => (tick: any) => {
    return tick
};

const patchProps = ({ hoverIndex, ...props }: any) => ({
    state: props.index === hoverIndex ? 'hovered' : null,
    ...props,
});

const LinePoint = (props: any) => <ScatterSeries.Point point={{ size: 7 }} {...patchProps(props)} />

const LineWithPoints = (props: any) => (
    <React.Fragment>
        <LineSeries.Path {...props} />
        <ScatterSeries.Path  {...props} />
    </React.Fragment>
);


const WorkLogChart: React.FC<any> = (props: any) => {

    const syncParams = useSelector((state: IState) => state.dashboard.syncParamsWorklogs);
    const [data, setData] = React.useState<Array<any> | undefined>(getData());
    const TooltipContent: React.ComponentType<Tooltip.ContentProps> = ({ text, ...props }) => {
        const index = props.targetItem.point;
        let title = data && data[index] ? `${data[index].date}:` : '';

        return <Box sx={{ display: "flex", justifyContent: "center", justifyItems: "center" }}  >
            <svg width="10" height="10" style={{ margin: "auto 0" }}>
                <circle cx="5" cy="5" r="5" fill={worklogColor} />
            </svg>
            <Tooltip.Content style={{ paddingLeft: "5px", fontWeight: "bold" }} text={title} {...props} />
            <Tooltip.Content style={{ paddingLeft: "3px" }} text={text} {...props} />
        </Box>

    };
    const Series = React.useMemo(() => () => {
        const props: Partial<LineSeriesProps & { pointComponent: any }> = {
            valueField: 'value',
            argumentField: 'date',
            color: worklogColor,
            pointComponent: LinePoint,
            seriesComponent: LineWithPoints
        };
        return React.createElement(LineSeries, props);
    }, [])

    React.useEffect(() => {


    }, [data])
    return (
        <Paper >
            <Chart data={data || []} height={300} >
                <ArgumentScale />
                <ValueScale modifyDomain={modifyDomain} />
                <ArgumentAxis />
                <ValueAxis tickFormat={formatDate} />
                <Series />

                <Animation />
                <EventTracker />
                <HoverState />
                <Tooltip contentComponent={TooltipContent} />

            </Chart>
        </Paper>
    )
};
export default React.memo(WorkLogChart)