import "./App.css";
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Customer from "./components/Customer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Navbar.js";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
//import { Theme, makeStyles } from '@material-ui/core/styles/';
import CustomerAdd from "./components/CustomerAdd";

const styles = (theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing(2),
  },
});
class App extends Component {
  // server에서 데이터를 받아오는 방법
  constructor(props) {
    //고객 데이터 다시 받아오는 함수
    super(props);
    this.state = {
      customers: "",
      completed: 0,
    };
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      .catch((err) => console.log(err));

    this.stateRefresh = this.stateRefresh.bind(this);
  }
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
    });
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    //데이터를 받아오는 작업 , 모든 컴포넌트 준비 완료 후
    this.timer = setInterval(this.progress, 20); //0.02초 마다 progress 함수가 재생
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    //비동기적으로 데이터 가져옴
    const response = await fetch("/api/customers"); //접속하고자 하는 api 주소
    const body = await response.json(); // 고객 목록을 json 형태로 body 변수에 넣음.
    return body;
  };
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Navbar />

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* 서버에서 -> state에서 데이터 받으면 -> Customer에 저장 */}
              {this.state.customers ? ( // state에 customers에 데이터가 있으면
                this.state.customers.map((c) => {
                  return (
                    <Customer
                      stateRefresh={this.stateRefresh}
                      key={c.id}
                      id={c.id}
                      image={c.image}
                      name={c.name}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}
                    />
                  );
                })
              ) : (
                // state에 customers에 데이터가 없으면
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress
                      className={classes.progress}
                      variant="determainate"
                      value={this.state.completed}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
