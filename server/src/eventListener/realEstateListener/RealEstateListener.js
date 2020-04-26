import { web3 } from "../web3Provider";
import RealEstateContract from "../../contracts/RealEstate.json";
import RealEstateEvent from "./Event";
import { handleNewCertEvent } from "./helper";
import { realEstateContractAddress } from "../../config/common-path";

const instanceContract = new web3.eth.Contract(
  RealEstateContract.abi,
  realEstateContractAddress
);

// listen all event emited from RealEstate contract
export function realEstateListener() {
  instanceContract.events
    .allEvents()
    .on("data", (event) => {
      console.log(`=========== Event: ${event.event} ===========`);
      return handleEvent(event);
    })
    .on("error", console.error);
}

async function handleEvent(event) {
  switch (event.event) {
    case RealEstateEvent.NEW_CERTIFICATE:
      await handleNewCertEvent(event);
      return;
    case RealEstateEvent.ACTIVATE:
      console.log(event.returnValues);
      return;
    case RealEstateEvent.ACTIVATE_SALE:
      console.log(event.returnValues);
      return;
    case RealEstateEvent.TRANSFER:
      console.log(event.returnValues);
    default:
      throw new Error("Type event does not exist");
  }
}