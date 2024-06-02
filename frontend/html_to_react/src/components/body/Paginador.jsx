import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function Paginador({results}){

    // Paginador de resultados
    let [searchParams, setSearchParams] = useSearchParams();
    const onChangePage = (e, page) =>{
        const newParams=new URLSearchParams(searchParams)
        newParams.set('page',page)
        setSearchParams(newParams)
        // const queryString = location.search;
        // const params = URLSearchParams(queryString)
                
    }
    const pagina = parseInt(searchParams.get("page") ?? "1")

    return(
        <div className="w-full flex  p-8 px-0 md:pr-12 justify-end">
            <Pagination  sx={{
            '& .MuiPaginationItem-root': {
                width: '3rem',
                height: '3rem',
                fontSize: '1.25rem',
            },
            }} /*classes={{ nav: 'flex justify-end' }}*/ page={pagina} count={results.totalPages} color="primary" shape="rounded" onChange={(e, page) => onChangePage(e, page)/*console.log("cambia", e, page)*/}  
                                boundaryCount={1} // Número de páginas en los límites
                                siblingCount={1} // Número de páginas alrededor de la página actual
            ></Pagination>
        </div>
    );
}