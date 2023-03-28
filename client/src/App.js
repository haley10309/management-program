import './App.css';
import React,{ Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    width : '100%',
    overflowX: "auto"
  },
  table:{
    minWidth: 1080
  }
})


class App extends Component {

  state = {//component 내에서 변경될 수 있는 변수
    customers: ""
  }

  componentDidMount(){//데이터를 받아오는 작업 , 모든 컴포넌트 준비 완료 후 
    this.callApi()
      .then(res => this.setState({customers : res}))
      .catch(err => console.log(err))
  }

  callApi = async () => { //비동기적으로 데이터 가져옴
    const response = await fetch('/api/customers'); //접속하고자 하는 api 주소
    const body = await response.json(); // 고객 목록을 json 형태로 body 변수에 넣음.
    return body;
  }


  render(){
    const { classes } = this.props;
    return (
      <Paper className = {classes.root}>
        <Table className= {classes.table}>
          <TableHead>
            <TableRow> 
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          
          {this.state.customers? this.state.customers.map(c =>  { 
            return ( <Customer  key = {c.id } id = {c.id } image = {c.image} name ={c.name } birthday ={c.birthday}  gender ={c.gender} job ={c.job}/>);
            }): ""}
        
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
