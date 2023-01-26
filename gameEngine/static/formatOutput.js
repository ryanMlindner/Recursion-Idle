//pretty wee babby file innit?
export default
function formatOutput(output) {
    if (output >= 10000) {
      output = output.toExponential(2);
    }
    return output;
  }