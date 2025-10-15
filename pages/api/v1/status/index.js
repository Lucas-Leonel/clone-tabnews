function status(request, response) {
  response.status(200).json({ chave: "Status" });
}

export default status;
