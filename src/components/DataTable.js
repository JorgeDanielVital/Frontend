import React, { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, FormGroup, ModalBody, ModalHeader, ModalFooter, Modal } from 'reactstrap'
import axios from 'axios';



const baseUrl = "http://127.0.0.1:5000/";


const DataTable = () => {

    const [data, setData] = useState([]); // Data en la tabla

    const [dataS, setDataS] = useState({ //Data a insertar 
        id: '',
        level_1: '',
        level_2: '',
        year: '',
        value: ''
    })

    const [insert, setInsert] = useState(false); //Variables para insertar
    const [del, setDelete] = useState(false); //variables para editar

    const [edit, setEdit] = useState(false); //variables para editar

    const getData = async () => { //GetMethod
        await axios.get(baseUrl)
            .then(res => {
                setData(res.data)
            }).catch(error => {
                console.log(error)
            })
    }

    const postData = async () => { //PostMethod
        delete dataS.id;
        await axios.post(baseUrl, dataS)
            .then(res => {
                setData(data.concat(res.data))
                openInsert()
            }).catch(error => {
                console.log(error)
            })
    }

    const putData = async () => { //PostMethod
        await axios.put(`${baseUrl}/${dataS.id}`, dataS)
            .then(res => {
                var resp = res.data
                var dataAux = data;
                dataAux.map(element => {
                    if (element.id === resp.id) { element = resp }
                })
                getData();
                openEdit()
            }).catch(error => {
                console.log(error)
            })
    }
    const deleteData = async () => { //PostMethod
        await axios.delete(`${baseUrl}/${dataS.id}`)
            .then(res => {
                getData();
                openDelete()
            }).catch(error => {
                console.log(error)
            })
    }
    const SingleData = (data, caso) => {
        setDataS(data)
        caso === "Editar" && openEdit();
        caso === "Eliminar" && openDelete();
    }

    const openInsert = () => { //Abrir el insert
        setInsert(!insert);
    }

    const openEdit = () => { //Abrir el edit
        setEdit(!edit);
    }

    const openDelete = () => {
        setDelete(!del);
    }


    useEffect(() => { //RecibirData
        getData();
    }, [])

    const handleChange = e => { //Agregando data al array
        const { name, value } = e.target;
        setDataS({ ...dataS, [name]: value });
    }

    return (
        <>
            <Container>
                <br />
                <Button color="primary" onClick={() => openInsert()}>Insertar nueva Data</Button>
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>
                                level_1
                            </th>
                            <th>
                                level_2
                            </th>
                            <th>
                                year
                            </th>
                            <th>
                                value
                            </th>
                            <th>
                                acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map(element => (
                                <tr key={element.id}>
                                    <td>
                                        {element.level_1}
                                    </td>
                                    <td>
                                        {element.level_2}
                                    </td>
                                    <td>
                                        {element.year}
                                    </td>
                                    <td>
                                        {element.value}
                                    </td>
                                    <td>
                                        <Button color="primary" onClick={() => SingleData(element, "Editar")}>
                                            Editar
                                        </Button>
                                    </td>
                                    <td>
                                        <Button color="danger" onClick={() => SingleData(element, "Eliminar")}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>)
                            )}
                    </tbody>
                </Table>

            </ Container>

            <Modal isOpen={insert}>
                <ModalBody>
                    <ModalHeader> Insertar Data</ModalHeader>
                    <FormGroup>
                        <label>
                            Level_1:
                        </label>
                        <br />
                        <input className='form-control' type='text' name="level_1" onChange={handleChange} />
                        <label>
                            Level_2:
                        </label>
                        <br />
                        <input className='form-control' type='text' name="level_2" onChange={handleChange} />
                        <label>
                            year:
                        </label>
                        <br />
                        <input className='form-control' type='text' name="year" onChange={handleChange} />
                        <label>
                            value:
                        </label>
                        <br />
                        <input className='form-control' type='text' name="value" onChange={handleChange} />
                    </FormGroup>
                    <ModalFooter>
                        <Button className='btn btn-primary' onClick={() => postData()} > Insertar </Button>
                        <Button className='btn btn-danger' onClick={() => openInsert()}> Cancelar </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>

            <Modal isOpen={edit}>
                <ModalBody>
                    <ModalHeader> Editar Data</ModalHeader>
                    <FormGroup>
                        <label>
                            Level_1:
                        </label>
                        <br />
                        <input className='form-control' type='text' name="level_1" onChange={handleChange} value={dataS && dataS.level_1} />
                        <label>
                            Level_2:
                        </label>
                        <br />
                        <input className='form-control' type='text' name="level_2" onChange={handleChange} value={dataS && dataS.level_2} />
                        <label>
                            year:
                        </label>
                        <br />
                        <input className='form-control' type='text' name="year" onChange={handleChange} value={dataS && dataS.year} />
                        <label>
                            value:
                        </label>
                        <br />
                        <input className='form-control' type='text' name="value" onChange={handleChange} value={dataS && dataS.value} />
                    </FormGroup>
                    <ModalFooter>
                        <Button className='btn btn-primary' onClick={() => putData()} > Editar </Button>
                        <Button className='btn btn-danger' onClick={() => openEdit()}> Cancelar </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>

            <Modal isOpen={del}>
                <ModalBody>
                    ¿ESTAS SEGURO QUE DESEA ELIMINAR ESTE DATO DE LA BASE DE DATOS?
                </ModalBody>
                <FormGroup>
                    <label>
                        Level_1:
                    </label>
                    <br />
                    <input className='form-control' type='text' name="level_1" onChange={handleChange} value={dataS && dataS.level_1} readOnly />
                    <label>
                        Level_2:
                    </label>
                    <br />
                    <input className='form-control' type='text' name="level_2" onChange={handleChange} value={dataS && dataS.level_2} readOnly />
                    <label>
                        year:
                    </label>
                    <br />
                    <input className='form-control' type='text' name="year" onChange={handleChange} value={dataS && dataS.year} readOnly />
                    <label>
                        value:
                    </label>
                    <br />
                    <input className='form-control' type='text' name="value" onChange={handleChange} value={dataS && dataS.value} readOnly />
                </FormGroup>
                <ModalFooter>
                    <Button className='btn btn-danger' onClick={() => deleteData()}>
                        Si
                    </Button>
                    <Button className='btn btn-secondary' onClick={() => openDelete()}>
                        No
                    </Button>
                </ModalFooter>
            </Modal>
        </>

    )
}




export default DataTable;
