export function translateAuthErrorMessage(error?: string): string {
  if (error == null || error == undefined || error == "") return "";
  if (error == "Invalid email") return "E-mail inválido";
  if (error == "String must contain at least 8 character(s)")
    return "Senha deve conter pelo menos 8 caracteres";
  if (error.includes("Invalid login credentials"))
    return "E-mail ou senha incorreto";
  if (error.includes("User already registered")) return "E-mail já cadastrado";
  return "Erro desconhecido";
}
