import React from "react";

class CustomerDelete extends React.Component {
  deleteCustomer(id) {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          // The status code 200 means the delete was successful
          this.props.stateRefresh();
          console.log("Customer deleted successfully");
        } else {
          console.log(
            "Customer deletion failed with status code: " + response.status
          );
        }
      })
      .catch((err) => console.log("Delete request failed: ", err));

      this.props.stateRefresh();
  }

  render() {
    return (
      <button
        onClick={(e) => {
          this.deleteCustomer(this.props.id);
        }}
      >
        삭제
      </button>
    );
  }
}

export default CustomerDelete;
