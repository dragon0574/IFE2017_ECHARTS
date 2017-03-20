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
]
/**
 * 柱状图配置
 */
var optionBar = {
  /**
   * 图表标题
   */
  title: {
    text: '基础图表-柱状图'
  },
  tooltip: {},
  /**
   * 图例
   */
  legend: {
    data: ['销量']
  },
  /**
   * x坐标数据
   */
  xAxis: {
    data: sellData.map(function(value, index) {
      return value.name
    })
  },
  yAxis: {},
  /**
   * 序列化？指定名称，数据，图表类型
   */
  series: [
    {
      name: '销量',
      type: 'bar',
      data: sellData.map(function(value, index) {
        return value.sell;
      })
    },
    {
      name: '销量',
      type: 'line',
      data: sellData,
      //样式配置
      itemStyle: {
        normal: {
          //阴影大小
          shadowBlur: 10
        }
      }
    }
  ]
};
/**
 * 饼图配置
 */
var optionPie = {
  title: {
    text: '基础图表-饼图'
  },
  tooltip: {
    trigger: 'item',
    /**
     * 悬浮式格式化数据
     * {}内是内部参数，其它部分是字符串，a是name，b是数据name，c是数据value,d是计算出的百分比,但这样一来就没有默认时的图标了
     */
    //formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: [
    {
      name: '销量',
      type: 'pie',
      radius: '55%',
      data: sellData,
      //样式配置
      itemStyle: {
        normal: {
          //阴影大小
          shadowBlur: 10
        }
      }
    }
  ]
}
/**
 * 折线图配置
 */
var optionLine = {
  title: {
    text: '服装生产销售图'
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
      console.log(params);
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
    data: ['销量', '产量', '售出率']
  },
  xAxis: {
    data: sellData.map(function(value, index) {
      return value.name
    })
  },
  yAxis: [
    {
      name: '销量/产量'
    },
    {
      name: '售出率',
      axisLabel: {
        formatter: function(value, index) {
          return value * 100 + '%';
        }
      }
    }
  ],
  series: [
    {
      name: '产量',
      type: 'bar',
      tooltip: {
        trigger: 'axis'
      },
      label: {
        normal: {
          show: true,
          position: 'top'
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
      name: '销量',
      type: 'bar',
      tooltip: {
        trigger: 'axis'
      },
      label: {
        normal: {
          show: true,
          position: 'top'
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
      label: {
        normal: {
          show: true,
          position: 'top',
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