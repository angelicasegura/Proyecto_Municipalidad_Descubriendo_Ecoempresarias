export async function handleEliminarComentario(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/comentarios/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al eliminar comentario");
  }

  return true;
}