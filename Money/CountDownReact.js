import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import PropTypes from 'prop-types'; // ES6
import { unitWidth, unitHeight } from './AdapterUtil.js';
const styles = StyleSheet.create({
  cardItemTimeRemainTxt: {
    fontSize: 2 * unitWidth,
    color: "#ff2d41",
    textAlign: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 2 * unitWidth,
    color: "#ff2d41",
    marginLeft: 7,
    textAlign: 'center',
    alignSelf: 'center',

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  defaultTime: {
    paddingHorizontal: 3,
    backgroundColor: '#ff2d41',
    fontSize: 2 * unitWidth,
    color: "#ff2d41",
    marginHorizontal: 3,
    borderRadius: 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
  defaultColon: {
    fontSize: 2 * unitWidth, color: "#ff2d41"
  },
  txt11: {
    fontSize: 22 * unitWidth,
    fontFamily: "PingFangTC",
    color: "#ff2d41",
    textAlign: 'center'
  },
});

class CountDown extends Component {
  static displayName = 'Simple countDown';
  static propTypes = {
    date: PropTypes.string,
    days: PropTypes.objectOf(PropTypes.string),
    hours: PropTypes.string,
    mins: PropTypes.string,
    segs: PropTypes.string,
    onEnd: PropTypes.func,

    // containerStyle: View.propTypes.style,
    // daysStyle: View.propTypes.style,
    // hoursStyle: View.propTypes.style,
    // minsStyle: View.propTypes.style,
    // secsStyle: View.propTypes.style,
    // firstColonStyle: View.propTypes.style,
    // secondColonStyle: View.propTypes.style,

  };
  static defaultProps = {
    date: new Date(),
    days: {
      plural: '天',
      singular: '天',
    },
    hours: ':',
    mins: ':',
    segs: ':',
    onEnd: () => { },

    containerStyle: styles.container,//container 的style
    daysStyle: styles.defaultTime,
    hoursStyle: styles.defaultTime,
    minsStyle: styles.defaultTime,
    secsStyle: styles.defaultTime,
    firstColonStyle: styles.defaultColon,
    secondColonStyle: styles.defaultColon,

  };
  state = {
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  };
  componentDidMount() {

    //console.log(this.props.date);//"2017-03-29T00:00:00+00:00"
    this.interval = setInterval(() => {
      const date = this.getDateData(this.props.date);
      // alert('dada'+JSON.stringify(date))
      if (date) {
        this.setState(date);
      } else {
        this.stop();
        this.props.onEnd();
      }
    }, 1000);
  }
  componentWillMount() {
    const date = this.getDateData(this.props.date);
    if (date) {
      this.setState(date);
    }

  }
  componentWillUnmount() {
    this.stop();
  }
  getDateData(endDate) {
    let diff = (Date.parse(new Date(endDate)) - (480 * 60 * 1000) - Date.parse(new Date)) / 1000;
    if (diff <= 0) {
      return false;
    }

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    if (diff >= (365.25 * 86400)) {
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;
    return timeLeft;
  }
  render() {
    const countDown = this.state;
    let days;
    if (countDown.days === 1) {
      days = this.props.days.singular;
    } else {
      days = this.props.days.plural;
    }
    return (
      //    <View style={styles.container}>
      //      <Text style={styles.text}>{
      //        ((countDown.days > 0) ? this.leadingZeros(countDown.days)+days:'')
      //        +this.leadingZeros(countDown.hours)
      //        +':'+this.leadingZeros(countDown.min)
      //        +':'+this.leadingZeros(countDown.sec)}</Text>
      //    </View>
      //
      <View style={this.props.containerStyle}>
        <Text style={styles.txt11}>倒计时  </Text>
        {(countDown.days > 0) ? <Text style={styles.txt11}>{this.leadingZeros(countDown.days) + days} </Text> : null}
        <Text style={styles.txt11}>{this.leadingZeros(countDown.hours)}</Text>
        <Text style={styles.txt11}>:</Text>
        <Text style={styles.txt11}>{this.leadingZeros(countDown.min)}</Text>
        <Text style={styles.txt11}>:</Text>
        <Text style={styles.txt11}>{this.leadingZeros(countDown.sec)}</Text>
      </View>


    );
  }
  stop() {
    clearInterval(this.interval);
  }
  leadingZeros(num, length = null) {

    let length_ = length;
    let num_ = num;
    if (length_ === null) {
      length_ = 2;
    }
    num_ = String(num_);
    while (num_.length < length_) {
      num_ = '0' + num_;
    }
    return num_;
  }
};

export default CountDown;