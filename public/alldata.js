function AllData(){
  const [data, setData] = React.useState('');
  const [myUser, setMyUser] = React.useContext(UserContext);

  React.useEffect(() => {
    //fetch all accounts from API
    fetch('account/all')
      .then(response => response.json())
      .then(data => {
        setData(JSON.stringify(data));
      });
  }, []);

  return (

  //look at the old BadBank for the format of the card that was used.
  <p>{data}</p>
  );    
};
