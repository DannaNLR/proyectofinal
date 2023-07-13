import React, { useState, useEffect } from "react";

export const Index1 = (system) => {
  const [carList, setCarList] = useState(() => {
    const storedCarList = JSON.parse(localStorage.getItem("carList")) || [];
    const updatedCarList = storedCarList.map((car) => ({
      ...car,
    }));
    return updatedCarList;
  });
  const [newCar, setNewCar] = useState({
    propietario: "",
    marca: "",
    modelo: "",
    año: "",
    color: "",
    rol: "",
    contraseña: "",
    fechaEntrada: "",
    fechaSalida: ""

  });
  const [editCar, setEditCar] = useState(null);

  useEffect(() => {
    localStorage.setItem("carList", JSON.stringify(carList));
  }, [carList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editCar) {
      setEditCar((prevCar) => ({
        ...prevCar,
        [name]: value
      }));
    } else {
      setNewCar((prevCar) => ({
        ...prevCar,
        [name]: value
      }));
    }
  };

  const addCar = () => {
    if (
      newCar.propietario &&
      newCar.marca &&
      newCar.modelo &&
      !isNaN(newCar.año) &&  // Validar que el campo "año" sea un número
      newCar.color &&
      newCar.rol &&
      newCar.contraseña 
    ) {
      const updatedList = [...carList, newCar];
      setCarList(updatedList);
      setNewCar({
        propietario: "",
        marca: "",
        modelo: "",
        año: "",
        color: "",
        rol: "",
        contraseña: "",
        fechaEntrada: "",
         fechaSalida: ""
      });
    } else {
      alert("Debes llenar todos los datos o El campo 'año' debe ser un número.");
    }
  };

  const updateCar = () => {
    if (
      editCar.propietario &&
      editCar.marca &&
      editCar.modelo &&
      !isNaN(editCar.año) && // Validar que el campo "año" sea un número
      editCar.color &&
      editCar.rol &&
      editCar.contraseña
    ) {
      const updatedList = carList.map((car) =>
        car.marca + car.modelo === editCar.marca + editCar.modelo ? editCar : car
      );
      setCarList(updatedList);
      setEditCar(null);
    } else {
      alert("Debes llenar todos los datos o El campo 'año' debe ser un número.");
    }
  };
  

  const editCarDetails = (car) => {
    const password = prompt("Ingrese la contraseña:");
    if (password === car.contraseña) {
      setEditCar(car);
      setNewCar({
        propietario: "",
        marca: "",
        modelo: "",
        año: "",
        color: "",
        rol: "",
        contraseña: "",
        fechaEntrada: "",
         fechaSalida: ""
      });
    } else {
      alert("Debes llenar todos los datos o El campo 'año' debe ser un número.");
    }
  };
  
  const deleteCar = (car) => {
    const password = prompt("Ingrese la contraseña:");
    if (password === car.contraseña) {
      const updatedList = carList.filter((c) => c !== car);
      setCarList(updatedList);
    } else {
      alert("Contraseña incorrecta. No se puede eliminar el carro.");
    }
  };
  

  return (
    <>
      <header>
        <div className="container">
          <p className="logo">Universidad laica Eloy Alfaro de Manabí</p>
          <nav>
            <a onClick={() => system.onFormSwitch('index3')}>Busqueda</a>
            <a onClick={() => system.onFormSwitch('index1')}>Registro de Vehiculo</a>
            <a onClick={() => system.onFormSwitch('index4')}>Entrada y Salida</a>

            <a onClick={() => system.onFormSwitch('index')}>Cerrar sesión</a>
          </nav>
        </div>
      </header>
      <div className="car-form">
        <h2>{editCar ? "Editar Carro" : "Agregar Carro"}</h2>

        <label>
          Propietario:
          <input
            type="text"
            name="propietario"
            value={editCar ? editCar.propietario : newCar.propietario}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={editCar ? editCar.marca : newCar.marca}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={editCar ? editCar.modelo : newCar.modelo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Año:
          <input
            type="text"
            name="año"
            value={editCar ? editCar.año : newCar.año}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={editCar ? editCar.color : newCar.color}
            onChange={handleInputChange}
          />
        </label>
        <label>
           ID Contraseña:
            <input
              type="text"
              name="contraseña"
              value={editCar ? editCar.contraseña : newCar.contraseña}
              onChange={handleInputChange}
            />
          </label>

        
        <select
          value={newCar.rol}
          onChange={(e) => {
            setNewCar((prevCar) => ({
              ...prevCar,
              rol: e.target.value
            }));
          }}
        >
          <option value="">Seleccionar rol</option>
          <option value="estudiantes">Estudiantes</option>
          <option value="docentes">Docentes</option>
          <option value="personas_de_servicios">Personas de Servicios</option>
          <option value="invitados">Invitados</option>
        </select>
        
        {editCar ? (
          <button onClick={updateCar}>Actualizar Carro</button>
        ) : (
          <button onClick={addCar}>Agregar Carro</button>
        )}
      </div>
      <div className="car-list-container">
        <div className="car-list">
          <h1>Lista de Carros</h1>
          <table className="car-table">
            <thead>
              <tr>
                <th>Propietario</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Color</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carList.map((car) => (
                <tr key={car.marca + car.modelo}>
                  <td>{car.propietario}</td>
                  <td>{car.marca}</td>
                  <td>{car.modelo}</td>
                  <td>{car.año}</td>
                  <td>{car.color}</td>
                  <td>{car.rol}</td>
                  <td>
                    <button onClick={() => editCarDetails(car)}>Editar</button>
                    <button onClick={() => deleteCar(car)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
