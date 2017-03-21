/**
 * 先设定数据,没用webpack，只能用es5
 */
var sellData = [
  {
    /**
     * 商品名称
     */
    name: '衬衫',
    /**
     * 卖出数量
     */
    sell: 5,
    /**
     * 产量
     */
    produce: 24
  },
  {name: '羊毛衫', sell: 20, produce: 54},
  {name: '雪纺衫', sell: 36, produce: 36},
  {name: '裤子', sell: 10, produce: 20},
  {name: '高跟鞋', sell: 10, produce: 37},
  {name: '袜子', sell: 20, produce: 30},
];
/**
 * 折线图配置
 */
var optionLine = {
  title: {
    text: '服装生产销售图',
    subtext: '数据来源于编'
  },
  //backgroundColor: '#6868ff',
  grid: {
    show: true,
    top: 100
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        show: true
      },
      restore: {
        show: true
      },
      dataZoom: {
        show: true
      },
      dataView: {
        show: true
      },
      magicType: {
        show: true
      }
    }
  },
  tooltip: {
    formatter: function(params) {
      var text = params[0].name + '<br/>';
      params.forEach(function(value, index) {
        if (value.seriesName !== '售出率') {
          text += (value.seriesName + ': ' + value.value + '<br/>');
        }
        else {
          text += (value.seriesName + ': ' +value.value * 100 + '%' + '<br/>');
        }
      });
      return text;
    }
  },
  legend: {
    top: 50,
    data: ['销量', '产量', '售出率']
  },
  xAxis: {
    position: 'top',
    data: sellData.map(function(value, index) {
      return value.name
    })
  },
  yAxis: [
    {
      name: '销量/产量',
      //反转做坐标轴
      inverse: true
    },
    {
      name: '售出率',
      axisLabel: {
        formatter: function(value, index) {
          return value * 100 + '%';
        }
      },
      inverse: true
    }
  ],
  series: [
    {
      name: '销量',
      type: 'bar',
      tooltip: {
        trigger: 'axis'
      },
      itemStyle: {
        normal: {
          color: '#0f0'
        }
      },
      label: {
        normal: {
          show: true,
          position: 'bottom'
        }
      },
      data: sellData.map(function(value, index) {
        return {
          name: value.name,
          value: value.sell
        }
      })
    },
    {
      name: '产量',
      type: 'bar',
      tooltip: {
        trigger: 'axis'
      },
      itemStyle: {
        normal: {
          color: '#00ffff'
        }
      },
      //柱间距
      barGap: '0',
      label: {
        normal: {
          show: true,
          position: 'bottom'
        }
      },
      data: sellData.map(function(value, index) {
        return {
          name: value.name,
          value: value.produce
        }
      })
    },
    {
      name: '售出率',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        //设置为axis 格式化无效
        trigger: 'axis',
        formatter: function(params) {
          return params.seriesName +'<br/>' + params.name + ': ' + params.value * 100 + '%';
        }
      },
      itemStyle: {
        normal: {
          color: '#008080'
        }
      },
      label: {
        normal: {
          show: true,
          position: 'bottom',
          formatter: function(params) {
            return params.value * 100 + '%';
          }
        }
      },
      data: sellData.map(function(value, index) {
        return {
          name: value.name,
          value: (value.sell / value.produce).toFixed(2)
        }
      })
    }
  ]
}
/**
 * 基于dom初始化echarts实例，可以是canvas
 */
var  myChart = echarts.init(document.getElementById('root'));
//使用配置和数据
myChart.setOption(optionLine);