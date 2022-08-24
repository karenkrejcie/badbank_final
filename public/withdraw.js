function Withdraw(){
  const [show, setShow]               = React.useState(true);
  const [status, setStatus]           = React.useState('');
  const [withdrawAmt, setWithdrawAmt] = React.useState('');
  const [myUser, setMyUser]           = React.useContext(UserContext);

  function validate(field){
        if(withdrawAmt.trim() === '' || isNaN(withdrawAmt)) {
          setStatus('Please enter a numeric value to make a withdraw');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        if(withdrawAmt > myUser.balance){
          setStatus('You do not have those funds available to withdraw. Please withdraw less.');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
      }

  function handleWithdraw(){
    //if it isn't a valid withdraw amount
    if (!validate(withdrawAmt))     return;

    //Update the user's balance by the withdrawal amount
    const url = `/account/withdraw/${myUser._id}/${withdrawAmt}`;
    (async () => {
      var res  = await fetch(url);
      var data = await res.json();

      //If there was an error in updating the user's balance:
      if (data.Error == 0) {
        setStatus('Withdrawal Unsuccessful. Please try again.');
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
    setWithdrawAmt('');
    setShow(true);
  }

  function SubmitButton () {
 
    if (withdrawAmt){
      return <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Process Withdraw</button>
    } else {
      return <button type="submit" disabled className="btn btn-light" onClick={handleWithdraw}>Process Withdraw</button>
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
      header="Make a Withdraw"
      status={status}
      body={show ? (  
              <>
              Withdraw Amount<br/>
              <input type="input" className="form-control" id="name" placeholder="Amount to Withdraw" value={withdrawAmt} onChange={e => setWithdrawAmt(e.currentTarget.value)} /><br/>
              <ShowBalance/>
              <SubmitButton/>
              
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make Another Withdraw</button>
              <ShowBalance/>
              </>
            )}
    />
  )
};