function DeleteAll(){
  const [data, setData] = React.useState('');
  const [myUser, setMyUser] = React.useContext(UserContext);
  const [status, setStatus]  = React.useState('default for delete');
  

  React.useEffect(() => {
    //fetch all accounts from API
    fetch('account/deleteAll')
      .then(response => response.json())
      .then(data => {
        setData(JSON.stringify(data));
        setStatus('Done');
      });
  }, []);

    return (
      <>
       <p>All Records deleted.</p>
       <p>{status}</p>
      </>
     
    )
  };