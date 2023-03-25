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

const customer = [
  {
    'id': 1,
    'image' : 'https://placeimg.com/64/64/1',
    'name' : '김민수',
    'birthday' : '961222',
    'gender' : '남자',
    'job' : '개발자' 
  },
  {
    'id': 2,
    'image' : 'https://placeimg.com/64/64/2',
    'name' : '박현규',
    'birthday' : '930412',
    'gender' : '남자',
    'job' : '프로그래머' 
  },
  {
    'id': 3,
    'image' : 'https://placeimg.com/64/64/any',
    'name' : '한연수',
    'birthday' : '090822',
    'gender' : '여자',
    'job' : '디자이너' 
  }
]

class App extends Component {
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
          
          {customer.map(c =>  { return ( <Customer  key = {c.id } id = {c.id } image = {c.image} name ={c.name } birthday ={c.birthday}  gender ={c.gender} job ={c.job}> </Customer>)})}
        
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
