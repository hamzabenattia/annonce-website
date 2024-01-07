import axios from 'axios';
import { Button, Modal } from 'flowbite-react';
import { API_BASE_URL } from '../constant/constant';
function DeleteModel({openModal, setOpenModal, item}) {


  const handleSubmit = async (event) => {
  
    try {
      const response = axios.delete(API_BASE_URL+'/annonce/'+item._id,{withCredentials: true} );
      window.location.reload();
      setOpenModal(false)

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };    



  return (

    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
    <Modal.Header />
    <Modal.Body>
      <div className="text-center">
     
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this Cours?
        </h3>
        <div className="flex justify-center gap-4">
          <Button type='submite' color="failure" onClick={handleSubmit}>
            {"Yes, I'm sure"}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            No, cancel
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default DeleteModel