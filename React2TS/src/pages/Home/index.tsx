import React, { Component } from 'react';
import { Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import request from '../../request';
import './style.css';

interface State {
  loaded: boolean;
  isLogin: boolean;
  data: DataStruct;
}

// ! Component可以接收两个泛型
// * 第一个泛型是props的泛型
// * 第二个是state的类型
class Home extends Component {
  state: State = {
    loaded: false,
    isLogin: true,
    data: {}
  };

  componentDidMount() {
    request.get('/api/isLogin').then(res => {
      const data: responseResult.isLogin = res.data;
      if (data) {
        this.setState({
          loaded: true
        });
      } else {
        this.setState({
          isLogin: false,
          loaded: true
        });
      }
    });
    request.get('/api/showData').then(res => {
      const data: responseResult.showData = res.data;
      this.setState({
        data: data
      });
    });
  }
  render() {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className='home-page' onClick={this.handleClick.bind(this)}>
            <div className='buttons'>
              <Button type='primary' data-id='1'>
                爬取
              </Button>
              <Button type='primary' data-id='2'>
                退出
              </Button>
            </div>
            <ReactEcharts option={this.getOption()} />
          </div>
        );
      } else {
        return null;
      }
    } else {
      return <Redirect to='/login' />;
    }
  }
  // todo 返回配置参数
  getOption: () => echarts.EChartOption = () => {
    const { data } = this.state;
    const courseNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for (let i in data) {
      const item = data[i];
      times.push(moment(Number(i)).format('MM-DD HH:mm'));
      item.forEach(innerItem => {
        const { title, count } = innerItem;
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title);
        }
        tempData[title]
          ? tempData[title].push(count)
          : (tempData[title] = [count]);
      });
    }
    const result: echarts.EChartOption.Series[] = [];
    for (let i in tempData) {
      result.push({
        name: i,
        type: 'line',
        data: tempData[i]
      });
    }
    return {
      title: {
        text: '课程在线学习人数'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: courseNames
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times
      },
      yAxis: {
        type: 'value'
      },
      series: result
    };
  };
  // todo 这个类型还是有点问题，不能直接使用dataset
  handleClick(e: any) {
    const target = e.target;
    const id = parseInt(target.dataset.id);

    // todo 点击爬去内容
    if (id === 1) {
      request.get('/api/getData').then(res => {
        const data: boolean = res.data;
        if (data) {
          message.success('获取成功');
        } else {
          message.error('获取失败');
        }
      });
    }
    // todo 点击退出按钮，需要发送请求，重定向到login
    if (id === 2) {
      request.get('/api/loginOut').then(res => {
        const data: responseResult.loginout = res.data;
        if (data) {
          this.setState({
            isLogin: false
          });
        } else {
          message.error('退出失败');
        }
      });
    }
  }
}

export default Home;
