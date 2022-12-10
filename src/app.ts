const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; end: (arg0: string) => void; }) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});