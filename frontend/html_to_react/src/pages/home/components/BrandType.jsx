import  { useState } from 'react';
//ok fichero import data from './data';
import GetBrands from './helpers/GetBrands';

export function BrandType({callback}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] =  useState([])

  // get del API para GetBrands
  const [data, setData] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const handleOutsideClick = (event) => {
    const modal = document.querySelector('dialog');
    if (event.target === modal) {
      closeModal();
    }
  };

  return (
    <>
      <div>
        {/* <button */}<span
          className="border border-gray-400 rounded-md p-1 text-lg text-gray-700 bg-gray-100"
          onClick={openModal}
        >
          Selecciona tus marcas ⤵
          </span>{/* </button> falla*/}
      </div>
      {isModalOpen && (
        <dialog
          className="w-screen h-screen flex z-10 justify-center absolute top-0 bg-transparent backdrop-blur-sm"
          open
          onKeyDown={handleEscapeKey}
          onClick={handleOutsideClick}
        >
        <div>  
</div>
<ul className="w-1/4 my-auto bg-gray-300 p-7 border border-gray-600 rounded-lg divide-y divide-gray-400 relative">  
  <GetBrands onDataFetch={setData}/>  
      {data ? (               
        data?.tiposMarcas?.map((brand, idx) => (
          <div key={idx}>            
              <li
                className={`cursor-pointer hover:bg-gray-400 ${
                  selectedBrands.includes(brand) ? 'bg-blue-500 text-white' : ''
                }`}
                key={idx}
                onClick={() => {
                  callback(brand);
                  setSelectedBrands((prevSelectedBrands) => {
                    if (prevSelectedBrands.includes(brand)) {
                      return prevSelectedBrands.filter((b) => b !== brand);
                    } else {
                      return [...prevSelectedBrands, brand];
                    }
                  });
                }}
              >
                {brand}
              </li>            
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
  <li className="hover:bg-gray-400" onClick={closeModal}>
    Close
  </li>
</ul>
        </dialog>
      )}
    </>
  );
}