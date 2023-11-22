function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',') + '\n';
  
    const rows = data.map(row => {
      return Object.values(row).join(',') + '\n';
    });
  
    return headers + rows.join('');
}

const formatMiddleware = (req, res, next) => {
    const { format } = req.query
    if (format === 'csv'){
        // Set the appropriate content type for CSV
        res.setHeader('Content-Type', 'text/csv');
        // Override the res.send function to send CSV data
        res.send = (data) => {
            const csvData = convertToCSV(data);
            res.end(csvData);
        }
    }
    else if(format === 'json'){
        res.setHeader('Content-Type', 'application/json');
    }
    next();
}

module.exports = formatMiddleware;
  