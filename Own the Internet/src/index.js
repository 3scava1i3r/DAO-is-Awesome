import  { SkynetClient }  from "./skynet-js";


let web3;
var file;
var accounts = [];
var docinfo;



const hiddenInput = document.getElementById("inputGroupFile02");
const Final_Upload = document.getElementById("inputGroupFileAddon02");
const R_add = document.getElementById("R_add");
const Txn_Hash = document.getElementById("Txnhash");



const initBrowse = () => {
  hiddenInput.addEventListener("change", () => {
       file = hiddenInput.files[0];
      console.log(hiddenInput.files[0]);
      console.log(R_add.value);
  });
}



const initUpload = () => {
  Final_Upload.addEventListener("click", async () => {
     try {
       const client = new SkynetClient("https://siasky.net/");
       const { skylink } = await client.upload(file);
       console.log(skylink);
        web3.eth.getAccounts()
            .then(_accounts => {
              accounts = _accounts;
              console.log(accounts[0]);




            });
     } catch (error) {
       console.log(error);
     }
   });
};



    const initTxnSearch = () => {
      web3.eth.getTransaction(Txn_Hash.value)
    .then(_docinfo => {
      docinfo = _docinfo;
      console.log(docinfo.input);
    });
    }

   document.addEventListener('DOMContentLoaded', () => {
     try {
      initBrowse();
      initUpload();
      initTxn();
      initTxnSearch();
     }
    catch (e){
      console.log(e.message);
    }
   });
