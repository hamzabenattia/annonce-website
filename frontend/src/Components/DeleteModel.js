import axios from 'axios';
import { Button, Modal } from 'flowbite-react';
import { API_BASE_URL } from '../constant/constant';
function DeleteModel({openModal, setOpenModal, item}) {

  const handleSubmit = async (event) => {
  
    try {
       axios.delete(API_BASE_URL+'/annonce/'+item._id,{withCredentials: true} );
      window.location.reload();
      setOpenModal(false)

    } catch (error) {
      console.log(error)
    }
  };    



  return (

    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
    <Modal.Header />
    <Modal.Body>
      <div className="text-center">
     
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Aver vous sure de supprimer cette annonce ?
        </h3>
        <div className="flex justify-center gap-4">
          <Button type='submite' color="failure" onClick={handleSubmit}>
            {"Oui, Supprimer"}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Non, Annuler
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default DeleteModel