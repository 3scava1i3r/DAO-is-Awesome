import  { SkynetClient }  from "./skynet-js";
import CryptoJS from "./crypto-js";
import OpenTimestamps from "./opentimestamps.min.js"
import {DetachedTimestampFile,Ops} from "./opentimestamps.min.js"
import { Frost } from '@po.et/frost-client';



const config = {
  host: 'https://explorer.poetnetwork.net', // required
  timeout: 10 // default 10 seconds
};

const token = "TEST_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIxMDBhMDU1Ny0zMWFjLTQ4NWUtYjk5Ny04MDU2OGFiOWZhNWIiLCJuZXR3b3JrIjoidGVzdCIsImNsaWVudF90b2tlbiI6InMuYTBvSFRnbzY4WEREdEFaS0Yxam4zSWtMIiwiaWF0IjoxNTk3NzQzODU2fQ.4CquMIjGPpnWFYB87NeHwhwN51L6UGFEYLQPIwj_SXM";

const frost = new Frost(config);



var file;

const HiddenInput = document.getElementById("inputGroupFile02");
const Final_Upload = document.getElementById("inputGroupFileAddon02");
const Txn_Hash = document.getElementById("Txnhash");
const Search_button = document.getElementById("button-addon2");
const Timeline_button = document.getElementById("timeline");


const initBrowse = () => {
  HiddenInput.addEventListener("change", () => {
       file = HiddenInput.files[0];


  });
};

const initUpload = () => {
  Final_Upload.addEventListener("click", async () => {
     try {
       const client = new SkynetClient("https://siasky.net/");
       const { skylink } = await client.upload(file);

       swal("Please save this ID!", skylink, "info");
       const hash = CryptoJS.SHA256(skylink).toString();

          const hashd = Buffer.from( hash ,'hex');
          const detached = DetachedTimestampFile.fromHash(new Ops.OpSHA256(), hashd).toString();

          OpenTimestamps.stamp(detached).then( ()=>{
          const fileOts = detached.serializeToBytes();
          const hehe = bytesToHex(fileOts);
          console.log(hehe);
        });

     } catch (error) {
       console.log(error);
     }
   });
};

const initSearch = () => {
  Search_button.addEventListener("click", async () => {

         try {
      const client = new SkynetClient("https://siasky.net/");
       client.download(Txn_Hash.value);

    } catch (error) {
      console.log(error)
    }
   });
};


const initTimeline = () => {
  Timeline_button.addEventListener("click", async () => {
  });
};

   document.addEventListener('DOMContentLoaded', () => {
     try {
      initBrowse();
      initUpload();
      initSearch();
      initTimeline();
     }
    catch (e){
      console.log(e.message);
    }
   });
