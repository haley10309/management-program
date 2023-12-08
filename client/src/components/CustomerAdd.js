import React from "react";
import post from "axios";

class CustomerAdd extends React.Component {
  constructor(props) { //생성자
    super(props);
    this.state = {
      file: null, //byte 형식
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "", //파일 이름
    };
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addCustomer()
      .then((response) => {
        console.log(response.data);
        this.props.stateRefresh(); //비동기적 -> 순서 보장 x
      })
      .catch((err) => console.log("handle form submit 부분 실패 ", err));

    this.setState({
      //file 초기화
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    });

    //전체 페이지를 재 로드 시키는 것은 비효율적이므로 props를 이용해서 부모 컴포넌트가 자식 컴포넌트에 정보를 넘겨주어야 함.
    //따라서 데이터 베이스 정보를 다시 가져오는 것이 나음.
  };
  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.userName);
    formData.append("birthday", this.state.birthday);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);

    // Make sure you set the 'Content-Type' header to 'multipart/form-data'
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    return post.post(url, formData, config);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
        <h1>고객추가</h1>
        프로필 이미지:{" "}
        <input
          type="file"
          file={this.state.file}
          value={this.state.fileName}
          onChange={this.handleFileChange}
        />
        <br />
        이름 :{" "}
        <input
          type="text"
          name="userName"
          value={this.state.userName}
          onChange={this.handleValueChange}
        />
        <br />
        생년월일:{" "}
        <input
          type="text"
          name="birthday"
          value={this.state.birthday}
          onChange={this.handleValueChange}
        />
        <br />
        성별:{" "}
        <input
          type="text"
          name="gender"
          value={this.state.gender}
          onChange={this.handleValueChange}
        />
        <br />
        직업:{" "}
        <input
          type="text"
          name="job"
          value={this.state.job}
          onChange={this.handleValueChange}
        />{" "}
        <br />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}
export default CustomerAdd;
