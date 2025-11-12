import { ValidacionClave } from "./model";

const commonPasswords: string[] = [
  "password",
  "123456",
  "qwerty",
  "admin",
  "letmein",
  "welcome",
  "monkey",
  "sunshine",
  "password1",
  "123456789",
  "football",
  "iloveyou",
  "1234567",
  "123123",
  "12345678",
  "abc123",
  "qwerty123",
  "1q2w3e4r",
  "baseball",
  "password123",
  "superman",
  "987654321",
  "mypass",
  "trustno1",
  "hello123",
  "dragon",
  "1234",
  "555555",
  "loveme",
  "hello",
  "hockey",
  "letmein123",
  "welcome123",
  "mustang",
  "shadow",
  "12345",
  "passw0rd",
  "abcdef",
  "123abc",
  "football123",
  "master",
  "jordan23",
  "access",
  "flower",
  "qwertyuiop",
  "admin123",
  "iloveyou123",
  "welcome1",
  "monkey123",
  "sunshine1",
  "password12",
  "1234567890",
];

const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  const tieneMayuscula = /[A-Z]/.test(clave);
  const tieneMinuscula = /[a-z]/.test(clave);

  if (tieneMayuscula && tieneMinuscula) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe contener al menos una letra mayúscula y una letra minúscula" };
  }
};

const tieneNumeros = (clave: string): ValidacionClave => {
  const tieneNumeros = /[0-9]/.test(clave);

  if (tieneNumeros) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe contener al menos un número." };
  }
};

const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  const tieneCaracteresEspeciales = /[!@#$%^&*(),.?":{}|<>]/.test(clave);

  if (tieneCaracteresEspeciales) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe contener al menos un carácter especial."};
  }
};

const tieneLongitudMinima = (clave: string): ValidacionClave => {
  const longitudMinima = 8;

  if (clave.length >= longitudMinima) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe tener al menos 8 caracteres de longitud." };
  }
};

const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
  const contieneNombreUsuario = clave.toLowerCase().includes(nombreUsuario.toLowerCase());
  
  if (contieneNombreUsuario) {
    return { esValida: false, error: "La clave no debe contener el nombre de usuario." };
  } else {
    return { esValida: true }
  }
};

const tienePalabrasComunes = (clave: string, commonPasswords: string[]): ValidacionClave => {
  const esComun = commonPasswords.includes(clave);

  if (esComun) {
    return { esValida: false, error: "La clave no debe ser una palabra común o fácil de adivinar." };
  } else {
    return { esValida: true }
  }
};

const validarClave = (nombreUsuario: string, clave: string, commonPasswords: string[]): ValidacionClave => {
  tieneMayusculasYMinusculas(clave);
  tieneNumeros(clave);
  tieneCaracteresEspeciales(clave);
  tieneLongitudMinima(clave);
  tieneNombreUsuario(nombreUsuario, clave);
  tienePalabrasComunes(clave, commonPasswords);

  if (
    tieneMayusculasYMinusculas(clave).esValida &&
    tieneNumeros(clave).esValida &&
    tieneCaracteresEspeciales(clave).esValida &&
    tieneLongitudMinima(clave).esValida &&
    tieneNombreUsuario(nombreUsuario, clave).esValida &&
    tienePalabrasComunes(clave, commonPasswords).esValida
  ) {
    return { esValida: true };
  } else {
    return { esValida: false, error: 
      `${tieneMayusculasYMinusculas(clave).error || ""} 
      ${tieneNumeros(clave).error || ""} 
      ${tieneCaracteresEspeciales(clave).error || ""} 
      ${tieneLongitudMinima(clave).error || ""} 
      ${tieneNombreUsuario(nombreUsuario, clave).error || ""} 
      ${tienePalabrasComunes(clave, commonPasswords).error || ""}`.trim()};
  }

};

const clave = "ikerN1.8967";

console.log(
  validarClave("ikerN1.8967", clave, commonPasswords)
);