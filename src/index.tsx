/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import {
	Chart,
	Tooltip,
	Axis,
	Legend,
	Interval,
	Coordinate,
	Interaction,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import * as  PropTypes from 'prop-types';

// import {
// 	DTEmpty, DTSkeleton,
// } from '@components';

/**
Description here
*/

const DTBarChart = ({
	type,
	data,
	fieldsToFold,
	colors,
	chartHeight,
	chartWidth,
	padding,
	error,
	// noData,
	// loading,
	legend,
	customTooltip,
	tooltipContainerTemplate,
	tooltipItemTemplate,
	onChartClicked,
	style,
	className,
}) => {
	const [localData, setLocalData] = React.useState([]);

	React.useEffect(() => {
		setLocalData(data);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	React.useEffect(() => {
		if (error) setLocalData([]);
	}, [error]);

	const onBarChartClicked = (e) => {
		if (e?.data?.data) {
			onChartClicked(e?.data?.data);
		}
	};
	const ds = new DataSet();
	const dv = ds.createView().source(localData);
	dv.transform({
		type   : 'fold',
		fields : fieldsToFold,
		key    : 'type',
		value  : 'value',
	});

	// if (loading) return <DTSkeleton loading={loading} />;

	return (
		<>
			<Chart
				height={chartHeight}
				width={chartWidth}
				data={dv}
				autoFit
				padding={padding}
				onPlotClick={onBarChartClicked}
				className={className}
				style={style}
				// placeholder={!localData.length && <DTEmpty description={error || noData || ''} />}
				// errorContent={() => <DTEmpty description="Error loading charts" />}
			>
				<Interval
					position="label*value"
					color={colors ? ['type', (item) => colors[item]] : 'type'}
					adjust={[
						{
							type        : 'dodge',
							marginRatio : 1 / 32,
						},
					]}
				/>
				<Coordinate
					transpose={type === 'horizontal'}
					scale={type === 'horizontal' ? [1, -1] : undefined}
					// actions={type !== 'horizontal' ? [[1, -1], ['transpose']] : undefined}
				/>
				<Interaction type="element-active" />
				<Tooltip
					showTitle={false}
					containerTpl={tooltipContainerTemplate}
					itemTpl={tooltipItemTemplate}
					shared
				>
					{customTooltip}
				</Tooltip>
				<Axis name="label" />
				<Axis
					name="value"
					position={type === 'horizontal' ? 'right' : undefined}
				/>
				<Legend visible={legend} />
			</Chart>
		</>
	);
};

DTBarChart.propTypes = {
	type         : PropTypes.oneOf(['horizontal', 'vertical']),
	/**
		Data Eg. [{label : '', value1 : '', value2 : '',data :{}}]
	*/
	data         : PropTypes.arrayOf(PropTypes.object).isRequired,
	/**
		Value fields to be folded
		Eg. ["valueField1", "valueField2"] or if only a single value field is present ["valueField1"]
	*/
	fieldsToFold : PropTypes.arrayOf(PropTypes.string).isRequired,
	colors       : PropTypes.objectOf(PropTypes.string),
	loading      : PropTypes.bool,
	error        : PropTypes.string,
	noData       : PropTypes.string,
	chartHeight  : PropTypes.number,
	chartWidth   : PropTypes.number,
	legend       : PropTypes.bool,
	padding      : PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.number),
		PropTypes.number,
	]),
	/**
		Custom tooltip function, should return tooltip to be displayed.
		Eg. (title) => return <span>{title}</span>
	*/
	customTooltip            : PropTypes.func,
	/**
		Tootip Container Template. Should be HTML contents in a string
	*/
	tooltipContainerTemplate : PropTypes.string,
	/**
		Tootip Item Template. Should be HTML contents in a string
	*/
	tooltipItemTemplate      : PropTypes.string,
	onChartClicked           : PropTypes.func,
	style                    : PropTypes.object,
	className                : PropTypes.string,
};

DTBarChart.defaultProps = {
	type                     : 'horizontal',
	colors                   : undefined,
	error                    : undefined,
	noData                   : undefined,
	loading                  : false,
	chartHeight              : 400,
	chartWidth               : 500,
	legend                   : true,
	padding                  : 'auto',
	customTooltip            : undefined,
	tooltipContainerTemplate : undefined,
	tooltipItemTemplate      : undefined,
	onChartClicked           : () => {},
	style                    : undefined,
	className                : undefined,
};

export default DTBarChart;
