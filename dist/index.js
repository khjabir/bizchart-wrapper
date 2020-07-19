

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var bizcharts = require('bizcharts');
var DataSet = _interopDefault(require('@antv/data-set'));
var PropTypes = require('prop-types');

/* eslint-disable no-use-before-define */
// import {
// 	DTEmpty, DTSkeleton,
// } from '@components';
/**
Description here
*/
var DTBarChart = function (_a) {
    var type = _a.type, data = _a.data, fieldsToFold = _a.fieldsToFold, colors = _a.colors, chartHeight = _a.chartHeight, chartWidth = _a.chartWidth, padding = _a.padding, error = _a.error, 
    // noData,
    // loading,
    legend = _a.legend, customTooltip = _a.customTooltip, tooltipContainerTemplate = _a.tooltipContainerTemplate, tooltipItemTemplate = _a.tooltipItemTemplate, onChartClicked = _a.onChartClicked, style = _a.style, className = _a.className;
    var _b = React.useState([]), localData = _b[0], setLocalData = _b[1];
    React.useEffect(function () {
        setLocalData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    React.useEffect(function () {
        if (error)
            setLocalData([]);
    }, [error]);
    var onBarChartClicked = function (e) {
        var _a, _b;
        if ((_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.data) {
            onChartClicked((_b = e === null || e === void 0 ? void 0 : e.data) === null || _b === void 0 ? void 0 : _b.data);
        }
    };
    var ds = new DataSet();
    var dv = ds.createView().source(localData);
    dv.transform({
        type: 'fold',
        fields: fieldsToFold,
        key: 'type',
        value: 'value',
    });
    // if (loading) return <DTSkeleton loading={loading} />;
    return (React.createElement(React.Fragment, null,
        React.createElement(bizcharts.Chart, { height: chartHeight, width: chartWidth, data: dv, autoFit: true, padding: padding, onPlotClick: onBarChartClicked, className: className, style: style },
            React.createElement(bizcharts.Interval, { position: "label*value", color: colors ? ['type', function (item) { return colors[item]; }] : 'type', adjust: [
                    {
                        type: 'dodge',
                        marginRatio: 1 / 32,
                    },
                ] }),
            React.createElement(bizcharts.Coordinate, { transpose: type === 'horizontal', scale: type === 'horizontal' ? [1, -1] : undefined }),
            React.createElement(bizcharts.Interaction, { type: "element-active" }),
            React.createElement(bizcharts.Tooltip, { showTitle: false, containerTpl: tooltipContainerTemplate, itemTpl: tooltipItemTemplate, shared: true }, customTooltip),
            React.createElement(bizcharts.Axis, { name: "label" }),
            React.createElement(bizcharts.Axis, { name: "value", position: type === 'horizontal' ? 'right' : undefined }),
            React.createElement(bizcharts.Legend, { visible: legend }))));
};
DTBarChart.propTypes = {
    type: PropTypes.oneOf(['horizontal', 'vertical']),
    /**
        Data Eg. [{label : '', value1 : '', value2 : '',data :{}}]
    */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    /**
        Value fields to be folded
        Eg. ["valueField1", "valueField2"] or if only a single value field is present ["valueField1"]
    */
    fieldsToFold: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.objectOf(PropTypes.string),
    loading: PropTypes.bool,
    error: PropTypes.string,
    noData: PropTypes.string,
    chartHeight: PropTypes.number,
    chartWidth: PropTypes.number,
    legend: PropTypes.bool,
    padding: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.number,
    ]),
    /**
        Custom tooltip function, should return tooltip to be displayed.
        Eg. (title) => return <span>{title}</span>
    */
    customTooltip: PropTypes.func,
    /**
        Tootip Container Template. Should be HTML contents in a string
    */
    tooltipContainerTemplate: PropTypes.string,
    /**
        Tootip Item Template. Should be HTML contents in a string
    */
    tooltipItemTemplate: PropTypes.string,
    onChartClicked: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
};
DTBarChart.defaultProps = {
    type: 'horizontal',
    colors: undefined,
    error: undefined,
    noData: undefined,
    loading: false,
    chartHeight: 400,
    chartWidth: 500,
    legend: true,
    padding: 'auto',
    customTooltip: undefined,
    tooltipContainerTemplate: undefined,
    tooltipItemTemplate: undefined,
    onChartClicked: function () { },
    style: undefined,
    className: undefined,
};

exports.default = DTBarChart;
//# sourceMappingURL=index.js.map
