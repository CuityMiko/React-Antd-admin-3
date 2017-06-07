/*
** setEcharts.js 
** auth:whr
** time:2017.3.23
*/

function getTableColumns(config){
  let columns = [];
  const { series, xAxisProp } = config;
  const { props, names } = series;
  columns.push({
    title: xAxisProp.name,
    dataIndex: xAxisProp.prop,
    key: xAxisProp.prop,
  });
  for(let [i, v] of props.entries()){
    columns.push({
      title: names[i],
      dataIndex: v,
      key: v,
    })
  }
  return columns
}

export {
	getTableColumns
}