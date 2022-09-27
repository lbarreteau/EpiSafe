function displayListening (ip, port) {
  console.log(`Server listening on : http://${ip}:${port}  (To Access, click on the link)`);
}

module.exports = { displayListening };