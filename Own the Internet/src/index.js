import  { SkynetClient }  from "./skynet-js";
import CryptoJS from "./crypto-js";
import OpenTimestamps from "./opentimestamps.min.js"
import {DetachedTimestampFile,Ops} from "./opentimestamps.min.js"
//import { Frost } from '@po.et/frost-client';
//import frostClient from '@po.et/frost-client';
//import  PostArchive from './frost-api/src/api/archives/PostArchive.ts';
import chainpoint from 'chainpoint-js/dist/bundle.web'



//const config = {
//  host: 'https://explorer.poetnetwork.net', // required
//  timeout: 10 // default 10 seconds
//};

//const token = "TEST_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIxMDBhMDU1Ny0zMWFjLTQ4NWUtYjk5Ny04MDU2OGFiOWZhNWIiLCJuZXR3b3JrIjoidGVzdCIsImNsaWVudF90b2tlbiI6InMuYTBvSFRnbzY4WEREdEFaS0Yxam4zSWtMIiwiaWF0IjoxNTk3NzQzODU2fQ.4CquMIjGPpnWFYB87NeHwhwN51L6UGFEYLQPIwj_SXM";

//const frost = new Frost(config);



var file;

const HiddenInput = document.getElementById("inputGroupFile02");
const Final_Upload = document.getElementById("inputGroupFileAddon02");
const Txn_Hash = document.getElementById("Txnhash");
const Search_button = document.getElementById("button-addon2");
const Timeline_button = document.getElementById("timeline");


const initBrowse = () => {
  HiddenInput.addEventListener("change",  () => {
       file = HiddenInput.files[0];
       console.log(file);

  });
};

const initUpload = () => {
  Final_Upload.addEventListener("click", async () => {
     try {
       const client = new SkynetClient("https://siasky.net/");
       const { skylink } = await client.upload(file);
       swal("Please save this ID!", skylink, "info");
       //const hash = CryptoJS.SHA256(skylink).toString();
        ///  const hashd = Buffer.from( hash ,'hex');
        //  const detached = DetachedTimestampFile.fromHash(new Ops.OpSHA256(), hashd).toString();
        //  OpenTimestamps.stamp(detached).then( ()=>{
        //  const fileOts = detached.serializeToBytes();
        //  const hehe = bytesToHex(fileOts);
        //  console.log(hehe);
        //});


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

//const [{ archiveUrl }] = await frostClient.postArchive(token, file);
  //  console.log(archiveUrl);

  const chp = require('chainpoint-js')

async function runIt() {
  // A few sample SHA-256 proofs to anchor
  let hashes = [
    '1d2a9e92b561440e8d27a21eed114f7018105db00262af7d7087f7dea9986b0a',
    '2d2a9e92b561440e8d27a21eed114f7018105db00262af7d7087f7dea9986b0a',
    '3d2a9e92b561440e8d27a21eed114f7018105db00262af7d7087f7dea9986b0a'
  ]

  // This line is only needed when specifying your own Gateway URIs.
  // Otherwise when the `uris` argument is omitted, automatic public Gateway discovery will be used.
  let uris //= ['http://3.17.155.208', 'http://18.191.50.129', 'http://18.224.185.143']

  // Submit each hash to selected Gateways
  let proofHandles = await chp.submitHashes(hashes, uris)
  console.log('Submitted Proof Objects: Expand objects below to inspect.')
  console.log(proofHandles)

  // Wait for Calendar proofs to be available
  console.log('Sleeping 120 seconds (60 sec aggregation, 60 sec calendar) to wait for proofs to generate...')
  await new Promise(resolve => setTimeout(resolve, 130000))

  // Retrieve a Calendar proof for each hash that was submitted
  let proofs = await chp.getProofs(proofHandles)
  console.log('Proof Objects: Expand objects below to inspect.')
  console.log(proofs)

  // Verify every anchor in every Calendar proof
  let verifiedProofs = await chp.verifyProofs(proofs)
  console.log('Verified Proof Objects: Expand objects below to inspect.')
  console.log(verifiedProofs)

  // Wait 90 minutes for Bitcoin anchor proof, then run getProofs again
}

runIt()

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
