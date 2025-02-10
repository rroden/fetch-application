import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DogResult } from "../api/dogs";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface MatchModalProps {
    match: DogResult;
    handleModalClose: () => void;
}
export default function MatchResultModal(props: MatchModalProps) {
    return (
        <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="p-6 w-120 shadow-lg opacity-100 rounded bg-stone-100">
            <div className="text-center">
              <div className="flex flex-row">
                <h3 className="text-2xl pb-4 font-bold grow">It&#39;s a Match!</h3>
                <div className="grid grid-row justify-items-end">
                    <a onClick={() => props.handleModalClose()}><FontAwesomeIcon icon={faX} className="text-md pt-2 cursor-pointer"/></a>
                </div>
              </div>
              <div className="grid grid-cols-2 place-items-center pt-2 pb-8">
                <Image alt="Your purrfect match" width={180} height={180} src={props.match.img}/>
                <div className="mt-2 pl-4 text-lg grid grid-rows-4">
                    <div className="flex flex-row gap-2">
                        <h6 className="font-semibold">Name:</h6>
                        <h6>{props.match.name}</h6>
                    </div>
                    <div className="flex flex-row gap-2">
                        <h6 className="font-semibold">Age:</h6>
                        <h6>{props.match.age}</h6>
                    </div>
                    <div className="flex flex-row gap-2">
                        <h6 className="font-semibold">Breed:</h6>
                        <h6>{props.match.breed}</h6>
                    </div>
                    <div className="flex flex-row gap-2">
                        <h6 className="font-semibold">Zip:</h6>
                        <h6>{props.match.zip_code}</h6>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}