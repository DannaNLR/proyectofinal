import React, { useState } from "react";

export const Index = (system) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validarFormulario = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Por favor, ingrese todos los campos.");
      return;
    }

    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }
    // Obtener los usuarios almacenados en el LocalStorage
    const storedUsers = localStorage.getItem("userList");

    // Verificar si hay usuarios almacenados
    if (storedUsers) {
      // Convertir los usuarios almacenados en un objeto
      const userList = JSON.parse(storedUsers);

      // Verificar si el correo y la contraseña coinciden con algún usuario registrado
      const matchedUser = userList.find(user => user.email === email && user.password === password);
      
      if (matchedUser) {
        // Si la autenticación es exitosa, puedes redirigir o realizar otras acciones necesarias.
        alert("Inicio de sesión exitoso");
        system.onFormSwitch('index1');
      } else {
        // Si las credenciales no coinciden, mostrar un mensaje de alerta.
        alert("Credenciales incorrectas. Por favor, intente nuevamente.");
      }
    } else {
      // Si no hay usuarios almacenados, mostrar un mensaje de alerta.
      alert("La cuenta no existe. Por favor, regístrese primero.");
    }

    // Restablecer los campos
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <form className="registros" onSubmit={validarFormulario}>
        <h4>INICIO DE SESIÓN</h4>
        <label htmlFor="email">Correo:</label>
        <input
          className="controls"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Ingrese su correo"
        />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <input
          className="controls"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Ingrese su contraseña"
        />
        <br />
      
        <span className="link-conte">¿No tienes una cuenta?{' '}
          <span className="link" onClick={() => system.onFormSwitch('index0')}>Regístrate aquí</span>
          .
        </span>
      
        <button className="button" type="submit" value="Ingresar">Ingresar</button>
      </form>
    </div>
  );
};

export default Index;
