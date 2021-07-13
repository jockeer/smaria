import React,{useState,useEffect} from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import Mensaje from '../layouts/Mensaje';

const FormAsegurados = ({setAccion, cargarDatos}) => {

    const [ asegurado, setAsegurado] = useState({
        ci:'',
        nombre:'',
        apellidoPaterno:'',
        apellidoMaterno:'',
        idCiudad:'',
        telefono:'',
        email:'',
        fechaNacimiento:'',
        idContrato:'',
        titular:'',
        descripcion:'',

    })

    const [ ciudades , setCiudades ] = useState([])
    const [ contratos, setContratos ] = useState([])

    const [ error, setError]= useState(false);

    const {ci, nombre,apellidoPaterno,apellidoMaterno,idCiudad,telefono,email,fechaNacimiento,idContrato,titular,descripcion} = asegurado;

    useEffect(() => {
        const cargarCiudades = async () => {

            const [ciudades, contratos] = await Promise.all([
                axios(`http://localhost:4000/v1/ciudad`),
                axios(`http://localhost:4000/v1/contrato`)

            ])
            setCiudades(ciudades.data.data)
            setContratos(contratos.data.data)
        }
        cargarCiudades();
    }, [])

    const onSubmit = async (e)=>{
        e.preventDefault();

        if(ci.trim()===''||nombre.trim()===''||apellidoPaterno.trim()===''||apellidoMaterno.trim()===''||idCiudad.trim()===''||idCiudad.trim()==='0'||telefono.trim()===''||email.trim()===''||fechaNacimiento.trim()===''||idContrato.trim()===''||titular.trim()===''||descripcion.trim()===''){
            setError(true);
            return
        }
        setError(false);
        var t = new Date();
        let fecha = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`
        
        await axios.post(`http://localhost:4000/v1/asegurado/request/`,{
            ci:ci,
            nombre: nombre,
            apellidoPaterno,
            apellidoMaterno,
            idCiudad: parseInt(idCiudad),
            telefono,
            email,
            fechaNacimiento,
            idContrato:parseInt(idContrato),
            titular:parseInt(titular),
            descripcion,
            fecha



        }).then(function (response) {
            swal("Registrado!", "El asegurado fue registrado correctamente", "success");    
            setAccion(1);
            cargarDatos();
        })
        .catch(function (error) {
            swal("Error!", "El asegurado no fue registrado", "error");    

          }); 
    }
    const onchange = e => {
        setAsegurado({
            ...asegurado,
            [e.target.name]: e.target.value
        })
    }
    const closeForm = () => {
        setAccion(1);
    }

    return ( 
        <form className="form_contrato shadow" onSubmit={onSubmit}>
            <button onClick={closeForm} className="cerrar_form">x</button>
            <h5 >Formulario de Asegurado</h5>
            <small><i>formulario de registro para los asegurados</i></small>
            <hr />

            <div className="form-group col-12">
                <label htmlFor="">Nombre</label>
                <input type="text" className="form-control" min="0" name="nombre" value={nombre} onChange={onchange}/>  
            </div>
            <br />
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="">Apellido Paterno</label>
                    <input type="text" className="form-control" min="0" name="apellidoPaterno" value={apellidoPaterno} onChange={onchange}/>  
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">Apellido Materno</label>
                    <input type="text" className="form-control" min="0" name="apellidoMaterno" value={apellidoMaterno} onChange={onchange}/>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="">Carnet de identidad</label>
                    <input type="text" className="form-control" min="0" name="ci" value={ci} onChange={onchange}/>  
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">Telefono</label>
                    <input type="number" min='0' className="form-control" name="telefono" value={telefono} onChange={onchange}/>
                </div>
            </div>
            <br />
            <div className="form-group col-12">
                <label htmlFor="">Email</label>
                <input type="email" className="form-control" min="0" name="email" value={email} onChange={onchange}/>  
            </div>
            <br />


            <div className="form-group col-10">
                <label htmlFor="">Ciudad</label>
                <select className="form-control" name="idCiudad" value={idCiudad} onChange={onchange}>
                    <option value="0">Seleccione su ciudad...</option>
                    {
                        ciudades.map((ciudad)=>{
                            return <option key={ciudad.id} value={`${ciudad.id}`}>{ciudad.nombre}</option>
                        })
                    }
                </select>
            </div>
            <br />
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="">Contrato</label>
                    <select className="form-control" name="idContrato" value={idContrato} onChange={onchange}>
                    <option value="0">Seleccione su contrato...</option>
                    {
                        contratos.map((contrato)=>{
                            return <option key={contrato.id} value={`${contrato.id}`}>{contrato.plan} - {contrato.cantidadDependientes}</option>
                        })
                    }
                </select>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">Titular</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="titular" value="1" id="flexRadioDefault1" onChange={onchange}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Si
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="titular" value="2" id="flexRadioDefault2" onChange={onchange}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            No
                        </label>
                    </div>
                </div>
            </div>
            <br />
            <div className="form-group col-12">
                <label htmlFor="">Descripcion</label>
                <textarea name="descripcion" className="form-control" value={descripcion} id="" cols="30" rows="3" onChange={onchange}></textarea>
                
            </div>
            <br />
        
            <div className="form-group col-12">
                <label htmlFor="">Fecha de Nacimiento</label>
                <input type="date" className="form-control" min="0" name="fechaNacimiento" value={fechaNacimiento} onChange={onchange}/>  
            </div>
            
            <br />
            <div className="d-grid gap-2">
                {
                    (error)
                    ? <Mensaje mensaje="Los campos deben ser llenados correctamente" tipo='danger' />
                    :null
                }
                <button type="submit" className="btn btn-success">Registrar</button>
            </div>
        </form>
    );
}
 
export default FormAsegurados;