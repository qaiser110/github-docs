console.log("Loading zipped lambda")

exports.handler = async (event, context) => {
  console.log(`val 1 : ${event.key1}`)
  console.log(`val 2 : ${event.key2}`)
  context.succeed(event.key1 + " " + event.key2)
};
