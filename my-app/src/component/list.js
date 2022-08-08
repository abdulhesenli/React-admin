import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { ProductData, PostStatus } from '../api';
import './Table.css'

function List() {


  const { handleChange, handleSubmit, values } = useFormik({

    initialValues: {
      status: '0',
    },


    onSubmit: async (values) => {
      let data = await PostStatus(values);
    },

  })



  const { isLoading, error, data } = useQuery("repoData", ProductData);

  // console.log(data);
  const [products, setProducts] = useState(data);
  const [status, setStatus] = useState(0);
  const [mehsul, setMehsul] = useState('');


  useEffect(() => {
    setProducts(data)
  }, [data])


  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(status);

  const test = (id) => {
    let Tap = data.find(item => {
      return item.id == id;
    });
    setMehsul(Tap)
  };

  const gonder = () => {
    mehsul.status = status;
    PostStatus(mehsul);
    console.log(products);
    setProducts(data)
  }




  return (
    <div>
      <section>

        <h1>Addproduct List</h1>
        <div className="tbl-header">
          <table border="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>CONTEXT</th>
                <th>PRICE</th>
                <th>IMAGES </th>
                <th>STATUS </th>
                <th>MODE</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table border="0">
            <tbody>

              {
                products &&
                products.map((item, index) => {

                  return (
                    <tr key={index}>
                      <td scope="row"> {index + 1} </td>
                      <td>{item.title} </td>
                      <td>{item.status}</td>
                      <td>{item.price}</td>
                      <td> <img className='dataimg' width='100px' src={item.images} alt="" /> </td>
                      <td>

                        {item.status == 0 && (
                          <button type="button" onClick={() => { test(item.id) }} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Gozlemededir... </button>

                        )}

                        {item.status == 1 && (
                          <button type="button" onClick={() => { test(item.id) }} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Aktiv... </button>

                        )}
                        {item.status == 2 && (
                          <button type="button" onClick={() => { test(item.id) }} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Legv edildi... </button>

                        )}


                        {/* <button type="button" onClick={()=>{ test(item.id) }} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Gozlemededir... </button> */}

                      </td>

                      <td>Wiev</td>



                    </tr>
                  )

                })


              }
             




            </tbody>
          </table>


          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Status</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                  <form  onSubmit={handleSubmit} >
                    <div className="form-check">
                      <input className="form-check-input" id="flexRadioDefault1" type="radio" name="status" value='1' checked={values.status === '1'} onInput={(e) => { setStatus(e.target.value) }} onChange={handleChange} />
                      <label className="form-check-label" for="flexRadioDefault1">
                        Aktiv
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" id="flexRadioDefault2" type="radio" name="status" value='0' checked={values.status === '0'} onInput={(e) => { setStatus(e.target.value) }} onChange={handleChange} />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Gozleme
                      </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" id="flexRadioDefault3" type="radio" name="status" value='2' checked={values.status === '2'} onInput={(e) => { setStatus(e.target.value) }} onChange={handleChange} />
                      <label className="form-check-label" for="flexRadioDefault3">
                        Legv
                      </label>
                    </div>
                  </form>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" onClick={gonder} className="btn btn-primary" data-bs-dismiss="modal" >submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default List;