

const DocxModule = () => {
  const generate = (data, filename) => {
    console.log(data.brands[0].items);
  }
  
  return {
    generate : generate
  }
}

module.exports = DocxModule();