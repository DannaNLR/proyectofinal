import React, { useRef } from "react";

export const Index0 = (system) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const ageRef = useRef();
  const passwordRef = useRef();

  const validarFormulario = (event) => {
    event.preventDefault();
  
    // Obtener los valores de los campos del formulario utilizando las referencias
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const mobile = mobileRef.current.value;
    const age = ageRef.current.value;
    const password = passwordRef.current.value;
  
    // Realizar la lógica de validación del formulario
    if (username.trim() === "") {
      alert("Ingrese un nombre de usuario válido");
      return;
    }
  
    if (email.trim() === "" || !email.includes("@")) {
      alert("Ingrese un correo electrónico válido");
      return;
    }
  
    if (mobile.trim() === "") {
      alert("Ingrese un número de teléfono válido");
      return;
    }
  
    if (isNaN(age) || age <= 0) {
      alert("Ingrese una edad válida");
      return;
    }
  
    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }
  
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const storedData = localStorage.getItem("userList");
  
    if (storedData) {
      const userList = JSON.parse(storedData);
      const existingUser = userList.find((user) => user.email === email);
  
      if (existingUser) {
        alert("Ya existe un usuario registrado con el mismo correo electrónico");
        return;
      }
    }
  
    // Generar el token único para el usuario
    const token = generateUniqueToken();
  
    // Guardar los datos del usuario junto con el token en el LocalStorage
    const userData = {
      username,
      email,
      mobile,
      age,
      password,
      token,
    };
  
    if (storedData) {
      const userList = JSON.parse(storedData);
      userList.push(userData);
      localStorage.setItem("userList", JSON.stringify(userList));
    } else {
      const userList = [userData];
      localStorage.setItem("userList", JSON.stringify(userList));
    }
  
    // Restablecer los campos y realizar cualquier otra acción necesaria
    usernameRef.current.value = "";
    emailRef.current.value = "";
    mobileRef.current.value = "";
    ageRef.current.value = "";
    passwordRef.current.value = "";
  
    // Mostrar mensaje de registro exitoso
    alert("Registro exitoso. Los datos han sido guardados en el LocalStorage");
  };
  
  // Función para generar un token único (puedes ajustar esta implementación según tus necesidades)
  const generateUniqueToken = () => {
    return Math.random().toString(36).substr(2, 10);
  };
  

  return (
    <form className="registros" onSubmit={validarFormulario}>
      <h4>REGISTRARSE</h4>
      <label htmlFor="username">Nombre de usuario:</label>
      <input
        className="controls"
        type="text"
        id="username"
        name="username"
        required
        placeholder="Ingrese nombre"
        ref={usernameRef}
      />
      <br />
      <label htmlFor="email">Correo electrónico:</label>
      <input
        className="controls"
        type="email"
        id="email"
        name="email"
        required
        placeholder="Ingrese correo electrónico"
        ref={emailRef}
      />
      <br />
      <label htmlFor="mobile">Teléfono Móvil:</label>
      <input
        className="controls"
        type="tel"
        id="mobile"
        placeholder="Ingrese número de teléfono"
        ref={mobileRef}
      />
      <br />
      <label htmlFor="number">Edad:</label>
      <input
        className="controls"
        type="number"
        id="number"
        placeholder="Ingrese edad"
        ref={ageRef}
      />
      <br />
      <label htmlFor="password">Contraseña:</label>
      <input
        className="controls"
        type="password"
        id="password"
        name="password"
        minLength={8}
        required
        placeholder="Ingrese contraseña"
        ref={passwordRef}
      />
      <br />
      <div className="registro">
      <span className="link-conte">¿tienes una cuenta?{' '}
          <span className="link" onClick={() => system.onFormSwitch('index')}>Inicia sesion aquí</span>
          .
        </span>

      </div>
      
      <button type="submit" value="Registrarse">Registrarse</button>
    </form>
  );
};

export default Index0;
