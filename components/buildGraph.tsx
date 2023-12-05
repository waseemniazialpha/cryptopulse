import * as shape from 'd3-scale';
import {scaleLinear} from 'd3-scale';
import {parse} from 'react-native-redash';
import {DataPoints, POINTS, SIZE} from './Modal';

export const buildGraph = (datapoints: DataPoints, label: string) => {
  const priceList = datapoints.prices.slice(0, POINTS);
  const formattedValues = priceList.map(
    price => [parseFloat(price[0]), price[1]] as [number, number],
  );
  const prices = formattedValues.map(value => value[0]);
  const dates = formattedValues.map(value => value[1]);
  const scaleX = scaleLinear()
    .domain([Math.min(...dates), Math.max(...dates)])
    .range([0, SIZE]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([SIZE, 0]);
  return {
    label,
    minPrice,
    maxPrice,
    percentChange: datapoints.percent_change,
    path: parse(
      shape
        .line()
        .x(([, x]) => scaleX(x) as number)
        .y(([y]) => scaleY(y) as number)
        .curve(shape.curveBasis)(formattedValues) as string,
    ),
  };
};
