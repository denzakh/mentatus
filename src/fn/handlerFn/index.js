  // непонятно, можно ли вынести эти функции в отдельный фаил, тк они берутся из mapStateToProps и mapDispatchToProps

  toggleText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.setText(name, value);
  }

  toggleRadio = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.setRadio(name, +value);
  }

  toggleTab = (e) => {
    const name = e.currentTarget.getAttribute("data-id");
    console.log(name); 
    this.setState({activeTab: name});
  }




 