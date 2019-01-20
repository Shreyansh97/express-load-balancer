/**
 * A simple middleware that exposes sendError and sendSuccess
 * methods to the response.
 */

module.exports = (req,res,next) => {

  res.sendError = (err, msg = 'Internal server error') => {
    err && console.error(err); //logging error if exists
    console.error(msg);
    res.send({ success: false, msg });
  };

  res.sendSuccess = (data) => {
    res.send({ success: true, ...(data && { data }) }); //appending data to response if not null
  }
  next();
}