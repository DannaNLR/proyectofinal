import React, { useState, useEffect } from "react";

export const Index3 = ( system ) => {
  const [carList, setCarList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [carSeleccionado, setCarSeleccionado] = useState(null);

  useEffect(() => {
    const storedCarList = JSON.parse(localStorage.getItem("carList")) || [];
    setCarList(storedCarList);
    setSearchResults(storedCarList);
  }, []);

  useEffect(() => {
    const results = carList.filter(
      (car) =>
        car &&
        car.marca &&
        car.marca.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [carList, searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleVerDetalles = (car) => {
    setCarSeleccionado(car);
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

      <div className="car-search">
        <h2>Búsqueda de carro</h2>
        <label>
          Marca:
          <input type="text" value={searchTerm} onChange={handleInputChange} />
        </label>
      </div>

      <div className="car-results">
        <h1>Resultados de la búsqueda</h1>
        <table className="car-table">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Color</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((car) => (
              <tr key={car.marca + car.modelo}>
                <td>{car.marca}</td>
                <td>{car.modelo}</td>
                <td>{car.year}</td>
                <td>{car.color}</td>
                <td>
                  <button onClick={() => handleVerDetalles(car)}>
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {carSeleccionado && (
        <div className="car-detalles">
        <button className="cerrar" onClick={() => setCarSeleccionado(null)}>
          X
        </button>
        <h3>Detalles del carro</h3>

        <p>Propietario: {carSeleccionado.propietario}</p>
        <p>Rol: {carSeleccionado.rol}</p>
        <p>Marca: {carSeleccionado.marca}</p>
        <p>Modelo: {carSeleccionado.modelo}</p>
        <p>Año: {carSeleccionado.year}</p>
        <p>Color: {carSeleccionado.color}</p>
      </div>
      )}
    </>
  );
};