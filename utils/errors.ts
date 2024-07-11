export function translateAuthErrorMessage(error?: string): string {
  if (error == null || error == undefined || error == "") return "";
  if (error == "Invalid email") return "E-mail inválido";
  if (error == "String must contain at least 8 character(s)") {
    return "Senha deve conter pelo menos 8 caracteres";
  }
  if (error.includes("Invalid login credentials")) {
    return "E-mail ou senha incorreto";
  }
  if (error.includes("Email already in use.")) return "E-mail já cadastrado";
  if (error == "String must contain at least 1 character(s)") {
    return "Obrigatório";
  }

  if (error === "Invalid email or password.") {
    return "E-mail ou senha inválidos";
  }

  console.log("error", error);
  return "Erro desconhecido";
}
