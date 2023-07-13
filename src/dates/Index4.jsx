import React, { useState, useEffect } from "react";

const PasswordModal = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(password);
    setPassword("");
    onClose();
  };

  return (
    <div className="car-detalles">
      <div className="password-modal-content">
        <h4>Ingrese la contraseña</h4>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleSubmit}>Ingresar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export const Index4 = (system) => {
  const [carList, setCarList] = useState(() => {
    const storedCarList = JSON.parse(localStorage.getItem("carList")) || [];
    const updatedCarList = storedCarList.map((car) => ({
      ...car,
    }));
    return updatedCarList;
  });


  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("carList", JSON.stringify(carList));
  }, [carList]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const authenticate = (inputPassword) => {
    const authenticatedCar = carList.find((car) => car.contraseña === inputPassword);

    if (authenticatedCar) {
      setAuthenticated(true);
      setPassword("");
    } else {
      alert("Contraseña incorrecta.");
    }
  };

  const addEntry = (car) => {
    if (authenticated) {
      if (!car.fechaEntrada) {
        const updatedCar = {
          ...car,
          fechaEntrada: new Date().toLocaleString()
        };

        const updatedList = carList.map((c) => (c === car ? updatedCar : c));
        setCarList(updatedList);
      } else {
        alert("El carro ya ha registrado la entrada.");
      }
    } else {
      setShowPasswordModal(true);
    }
  };

  const addExit = (car) => {
    if (authenticated) {
      if (car.fechaEntrada && !car.fechaSalida) {
        const updatedCar = {
          ...car,
          fechaSalida: new Date().toLocaleString()
        };

        const updatedList = carList.map((c) => (c === car ? updatedCar : c));
        setCarList(updatedList);
      } else {
        alert("El carro no ha registrado la entrada o ya ha registrado la salida.");
      }
    } else {
      setShowPasswordModal(true);
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
                    <button onClick={() => addEntry(car)}>Entrada</button>
                    <button onClick={() => addExit(car)}>Salida</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="entry-log">
          <h2>Registros de Entrada</h2>
          <table className="log-table">
            <thead>
              <tr>
                <th>Propietario</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Fecha de Entrada</th>
              </tr>
            </thead>
            <tbody>
              {carList.map((car) => (
                <tr key={car.marca + car.modelo + car.fechaEntrada}>
                  <td>{car.propietario}</td>
                  <td>{car.marca}</td>
                  <td>{car.modelo}</td>
                  <td>{car.fechaEntrada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="exit-log">
          <h2>Registros de Salida</h2>
          <table className="log-table">
            <thead>
              <tr>
                <th>Propietario</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Fecha de Salida</th>
              </tr>
            </thead>
            <tbody>
              {carList.map((car) => (
                <tr key={car.marca + car.modelo + car.fechaSalida}>
                  <td>{car.propietario}</td>
                  <td>{car.marca}</td>
                  <td>{car.modelo}</td>
                  <td>{car.fechaSalida}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSubmit={authenticate}
        />
      )}
    </>
  );
};
