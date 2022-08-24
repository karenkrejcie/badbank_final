function Logout(){
  
    //keep the context so we don't have to keep hitting the DB
    const [myUser, setMyUser] = React.useContext(UserContext);

    React.useEffect(() => {
      //logout user
      setMyUser('');
    }, []);
    
    return (
      <Card
        bgcolor="primary"
        header="Logout"
        body={
                <h5>You have successfully been logged out.</h5>
              }
      />
    )  
  }
  