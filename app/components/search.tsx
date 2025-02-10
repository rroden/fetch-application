import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DogResult, fetchNextPage, getDogBreeds, getDogDetails, getDogs, getMatchId } from "../api/dogs";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import { useEffect, useState } from "react";
import MatchResultModal from "./match-result";
import Image from "next/image";


interface FetchResult {
    total: number;
    data: DogResult[];
    next: string;
    previous: string;
}

type SortDirection = "asc" | "desc" | undefined;

async function fetchData(sort?: string, breed?: string): Promise<FetchResult> {
    const allDogs = await getDogs(sort, breed);
    const tableData = await getDogDetails(allDogs.resultIds)
    return {total: allDogs.total, data: tableData, next: allDogs.next, previous: allDogs.prev};
}

async function getNextPage(path: string) {
    const allDogs = await fetchNextPage(path)
    const tableData = await getDogDetails(allDogs.resultIds)
    return {total: allDogs.total, data: tableData, next: allDogs.next, previous: allDogs.prev};
}

async function retrieveDogBreeds()
{
    return await getDogBreeds();
};

export default function Search() {
    const [page, setPage] = useState(0);
    const [sortDirection, setSortDirection] = useState("asc" as SortDirection);
    const [tableData, setTableData] = useState([] as DogResult[]);
    const [total, setTotal] = useState(0);
    const [selectedBreed, setSelectedBreed] = useState("");
    const [dogBreeds, setDogBreeds] = useState([]);
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [purrfectMatch, setPurrfectMatch] = useState<DogResult>()

    // Fetch dog breeds
    useEffect(() => {
        const fetchDogBreeds = async () => {
            try {
                const dogBreeds = await retrieveDogBreeds();
                setDogBreeds(dogBreeds);
            }
            catch (error){
                console.error("Error fetching data:", error);
            }
            
        }
        fetchDogBreeds();
    }, [])

    // Fetch table data
    useEffect(() => {
        const fetchSortedData = async () => {
          try {
            const data = await fetchData(`breed:${sortDirection}`, selectedBreed);
            setTableData(data.data);
            setTotal(data.total);
            setNext(data.next);
            setPrevious(data.previous);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchSortedData();
      }, [sortDirection, selectedBreed]);
    
    // Paginate to next page
    const fetchNextPageData = async () => {
        try {
            const data = await getNextPage(next)
            setTableData(data.data);
            setTotal(data.total);
            setNext(data.next);
            setPrevious(data.previous);
            } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Paginate to previous page
    const fetchPreviousPageData = async () => {
        try {
            const data = await getNextPage(previous)
            setTableData(data.data);
            setTotal(data.total);
            setNext(data.next);
            setPrevious(data.previous);
            } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        if (newPage > page){
            fetchNextPageData();
        }
        else {
            fetchPreviousPageData();
        }
        setPage(newPage);
    };
    
    const handleSort = () => {
        setSortDirection((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
    };

    const handleAddToFavorite = (id: string) => {
        if (favorites.includes(id)){
            setFavorites((prevFavorites) => prevFavorites.filter((f) => f !== id));
        }
        else {
            setFavorites((prevFavorites) => [...prevFavorites, id]);
        }
    };

    const handleMatchModalClose = () => {
        setShowModal(false);
    }

    const generateMatch = async () => {
        if (favorites?.length > 0) {
            const result = await getMatchId(favorites);
            const match = await getDogDetails([result.match]);
            setShowModal(true);
            setPurrfectMatch(match[0]);
        }
        else {
            console.log("No favorites selected")
        }

    }
    
    return (
        <>
            {showModal && purrfectMatch && <MatchResultModal match={purrfectMatch} handleModalClose={handleMatchModalClose}></MatchResultModal>}
            <TableContainer className="h-screen flex flex-col gap-4 items-center pt-4 pb-16 w-full">
                <div className="w-3/4 place-items-start">
                    <label className="font-medium gap-y-8 pr-2">Filter by Breed</label>
                    <select className="border border-stone-200" value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
                    <option value="">All Breeds</option>
                    {dogBreeds.map((breed: string) => (
                        <option key={breed} value={breed}>
                        {breed}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="w-3/4">
                    <Table className="table-auto pt-16 border-solid">
                        <TableHead>
                            <TableRow className="border bg-stone-300 border-solid">
                                <TableCell sx={{textAlign: "left", paddingLeft: 4, fontWeight: "bold", padding: 2, fontSize: 16}}>Picture</TableCell>
                                <TableCell sx={{textAlign: "left", paddingLeft: 4, fontWeight: "bold", padding: 2, fontSize: 16}}>Name</TableCell>
                                <TableCell sx={{textAlign: "left", paddingLeft: 4, fontWeight: "bold", padding: 2, fontSize: 16}}>Age</TableCell>
                                <TableCell sx={{textAlign: "left", paddingLeft: 4, fontWeight: "bold", padding: 2, fontSize: 16}}>Zip</TableCell>
                                <TableCell sx={{textAlign: "left", paddingLeft: 4, fontWeight: "bold", padding: 2, fontSize: 16}}>                
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort()}
                            >
                            Breed
                            </TableSortLabel></TableCell>
                                <TableCell sx={{textAlign: "left", paddingLeft: 4, fontWeight: "bold", padding: 2, fontSize: 16}}>Favorite</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="">
                            {tableData.map((dog: DogResult) => (
                                <TableRow key={dog.id}>
                                    <TableCell className="border border-solid border-stone-300 pl-4"><Image alt="Your furry friend" width={50} height={50} src={dog.img}></Image></TableCell>
                                    <TableCell className="border border-solid border-stone-300 pl-4">{dog.name}</TableCell>
                                    <TableCell className="border border-solid border-stone-300 pl-4">{dog.age}</TableCell>
                                    <TableCell className="border border-solid border-stone-300 pl-4">{dog.zip_code}</TableCell>
                                    <TableCell className="border border-solid border-stone-300 pl-4">{dog.breed}</TableCell>
                                    <TableCell className="border border-solid border-stone-300 pl-4"><button onClick={() => handleAddToFavorite(dog.id)}>{favorites.includes(dog.id) ? <FontAwesomeIcon className="text-lg" icon={SolidHeart}></FontAwesomeIcon> : <FontAwesomeIcon className="text-lg" icon={faHeart}></FontAwesomeIcon>}</button></TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={total}
                        rowsPerPage={10}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                </div>
                <button onClick={() => generateMatch()} className="bg-stone-500 p-2 rounded text-white">Generate Match</button>
            </TableContainer>
        </>
    );
};