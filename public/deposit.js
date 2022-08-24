function Deposit(){
  const [show, setShow]             = React.useState(true);
  const [status, setStatus]         = React.useState('');
  const [depositAmt, setDepositAmt] = React.useState('');
  const [myUser, setMyUser]         = React.useContext(UserContext);

  function validate(field){
        if(depositAmt.trim() === '' || isNaN(depositAmt)) {
          setStatus('Please enter a numeric value to make a deposit');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        if(depositAmt <= 0){
          setStatus('Please enter a valid larger than 0 to make a deposit');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
      }

  function handleDeposit(){
    //if it isn't a valid deposit amount
    if (!validate(depositAmt))     return;

    //Update the user's balance by the deposit amount
    const url = `/account/deposit/${myUser._id}/${depositAmt}`;
    (async () => {
      var res  = await fetch(url);
      var data = await res.json();

      //If there was an error in updating the user's balance:
      if (data.Error == 0) {
        setStatus('Deposit Unsuccessful. Please try again.');
      } 
      else {
       //Get updated balance
      
      const url = '/account/balance/' + myUser._id;
    
      (async () => {
        var res  = await fetch(url);
        var data = await res.json();

        //If there was an error in finding the user login information:
        if (data.Error == 0) {
          setStatus('No user found. Please try again.');      
        } else {
         //Set context if successful
         setMyUser(data);        
        } 
      })();

       //can't reset context because context isn't the user
       setShow(false);
      } 
    })
    ();
  }    

  function clearForm(){
    setDepositAmt('');
    setShow(true);
  }

  function SubmitButton () {
 
    if (depositAmt){
      return <button type="submit" className="btn btn-light" onClick={handleDeposit}>Process Deposit</button>
    } else {
      return <button type="submit" disabled className="btn btn-light" onClick={handleDeposit}>Process Deposit</button>
    };
  }

  function ShowBalance () {
    return <><div className="balanceInfo center"><Card
    bgcolor="danger"
    header="Current Available Balance"
    status=""
    body={<>$<button type="button" className="btn btn-info balanceInfo">{myUser.balance}</button></>}
    /></div></>
  }

  return (
    
    <Card
      bgcolor="primary"
      header="Make a Deposit"
      status={status}
      body={show ? (  
              <>
              Deposit Amount<br/>
              <input type="input" className="form-control" id="name" placeholder="Amount to Deposit" value={depositAmt} onChange={e => setDepositAmt(e.currentTarget.value)} /><br/>
              <ShowBalance/>
              <SubmitButton/>
              
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make Another Deposit</button>
              <ShowBalance/>
              </>
            )}
    />
  )
}